import db from '../Config/database.js';


async function logout(req, res) {
    const { token } = req.body;
    if (!token) {
        console.error('Logout error: Missing token');
        return res.sendStatus(400);
    }

    try {
        await db.execute('DELETE FROM refresh_tokens WHERE token = ?', [token]);
        res.sendStatus(204);
    } catch (error) {
        console.error('Logout error:', error.message);
        res.status(500).json({ error: 'Error logging out', details: error.message });
    }
}

export { logout };
