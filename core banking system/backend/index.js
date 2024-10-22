import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './services/Config/database.js';
import { getLoanDetails, getCreditLimit } from './services/Loan/loan_services.js';
import { money_transfer } from './services/MoneyTransfer/money_transfer.js';
import { getAccounts, getAccountSummary } from './services/AccountManagement/account_details.js';
import authRoutes from './services/Authentication/login.js';
import protectedRoutes from './routes/protected.js';
import refreshRoutes from './routes/referesh.js';
import authenticateToken from './middleware/auth.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

db.getConnection((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.listen(8800, () => {
    console.log('Connected to backend! Server is running on http://localhost:8800');
});

// Logout route
app.post('/logout', async (req, res) => {
    const { token } = req.body;
    if (!token) return res.sendStatus(400);

    try {
        await db.execute('DELETE FROM refresh_tokens WHERE token = ?', [token]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Error logging out', details: error.message });
    }
});

// Routes
app.use('/auth', authRoutes);
app.use('/api', authenticateToken, protectedRoutes);
app.use('/refresh', refreshRoutes);

// Define routes using async functions
app.get("/accounts", getAccounts);
app.get("/accounts_summary", getAccountSummary);
app.get("/loan_details", getLoanDetails);
app.get("/credit-limit", getCreditLimit);
app.post("/money_transfer", money_transfer);

// Existing routes...
app.get("/", (req, res) => {
    res.json("Hello this is the backend");
});