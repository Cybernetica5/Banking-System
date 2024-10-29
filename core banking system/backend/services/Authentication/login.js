import express, { response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import db from '../Config/database.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const router = express.Router();

router.use(cookieParser());

const validateRegistrationInput = [
  body('account_number').notEmpty(),
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

const validateLoginInput = [
  body('email').isEmail(),
  body('password').exists()
];

router.post('/signup', validateRegistrationInput, async (req, res) => {
  console.log('/////////////Validating registration input///////////////');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, account_number } = req.body;
  console.log('user', username, email, password, account_number);

  try {
    const [existingUser] = await db.execute('SELECT email FROM user WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    const [account] = await db.execute('SELECT customer_id FROM account WHERE account_number = ?', [account_number]);
    if (account.length <= 0) {
      return res.status(409).json({ error: 'Your account does not exist' });
    }
    const customerId = account[0].customer_id;

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute('CALL register_user(?, ?, ?, ?)', [customerId, username, email, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
    console.log('/////////////User registered successfully///////////////');
  } catch (error) {
    console.log('/////////////Error registering user///////////////');
    res.status(500).json({ error: 'Error registering user', details: error.message });
  }
});

router.post('/login', validateLoginInput, async (req, res) => {
  console.log('/////////////Validating login input///////////////');
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const [user] = await db.execute('SELECT user_id as id, user_name, email, password as password_hash, role FROM user WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(401).json({ error: '**Invalid email**' });
    }
    console.log('User:', user);
    
    

    const isMatch = await bcrypt.compare(password, user[0].password_hash);
    if (!isMatch) {
      console.log('**Invalid password**');
      return res.status(401).json({ error: 'Invalid password' });
    }
    console.log('**User authenticated**');

    const accessToken = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user[0].id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

    // Store refresh token in the database
    
    await db.execute('INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)', [refreshToken, user[0].id]);
    console.log('---Refresh token stored in the database---');
    // Set cookies
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.cookie('userId', user[0].id, { httpOnly: true, secure: true, sameSite: 'Strict' });
    res.cookie('email', user[0].email, { httpOnly: true, secure: true, sameSite: 'Strict' });
    
    console.log("Cookies successfully set");

    if (user[0].role === 'customer') {
      const [customerId] = await db.execute('SELECT customer_id FROM customer WHERE user_id = ?', [user[0].id]);
      
      res.cookie('customerId', customerId[0].customer_id, { httpOnly: true, secure: true, sameSite: 'Strict' });
      res.status(200).json({ message: 'Login successful', userId: user[0].id, customerId: customerId[0].customer_id, role: user[0].role, accessToken, refreshToken });
    } 
    if (user[0].role === 'staff') {
      const [staff] = await db.execute('SELECT role, staff_id FROM staff WHERE user_id = ?', [user[0].id]);
      const staff_role = staff[0].role;
      const staff_id = staff[0].staff_id;
      console.log('Staff:', staff_id, staff_role);

      // Get branch id
      let branch_id;

      if (staff_role === 'manager') {
        const [rows] = await db.execute('SELECT b.branch_id FROM manager m JOIN branch b ON m.manager_id = b.manager_id WHERE m.staff_id = ?', [staff_id]);
        branch_id = rows[0].branch_id;
        console.log('manager branch:', branch_id);
      } else if (staff_role === 'employee') {
        const [rows] = await db.execute('SELECT branch_id FROM employee WHERE staff_id = ?', [staff_id]);
        branch_id = rows[0].branch_id;
        console.log('employee branch:', branch_id);
      }

      res.cookie('staffId', staff_id, { httpOnly: true, secure: true, sameSite: 'Strict' });
      res.cookie('role', staff_role, { httpOnly: true, secure: true, sameSite: 'Strict' });
      res.cookie('branchId', branch_id, { httpOnly: true, secure: true, sameSite: 'Strict' });
      
      res.status(200).json({ message: 'Login successful', userId: user[0].id, role: staff_role, branch_id: branch_id, accessToken, refreshToken, staff_id });
     
    }
    
    
    console.log('/////////////Login successful///////////////');
  } catch (error) {
    console.log('/////////////Error logging in user///////////////');
    res.status(500).json({ error: 'Error logging in user', details: error.message });
  }
});

router.post('/token', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.sendStatus(401);

  try {
    const [storedToken] = await db.execute('SELECT * FROM refresh_tokens WHERE token = ?', [token]);
    if (storedToken.length === 0) return res.sendStatus(403);

    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
      res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error refreshing token', details: error.message });
  }
});

export default router;