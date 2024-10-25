import express from 'express';
import jwt from 'jsonwebtoken';
import db from '../services/Config/database.js';

const router = express.Router();

router.post('/token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const [storedToken] = await db.execute('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
    if (storedToken.length === 0) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error refreshing token', details: error.message });
  }
});

export default router;