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
import { addIndividualCustomer, addOrganizationCustomer } from './services/Customers/customer_services.js';
import { getTransactionReport } from './services/Reports/report_services.js';
import { depositFunds, withdrawFunds } from './services/Transactions/transaction_services.js';
import { getAccountDetails } from './services/Accounts/account_services.js';    

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

// app.get("/recent_transactions/:customerId", getRecentTransactions);

// Reports
app.post("/report/transaction", getTransactionReport);

app.post("/add-customer/individual", addIndividualCustomer);
app.post("/add-customer/organization", addOrganizationCustomer);

// Transactions
app.post("/deposit", depositFunds);
app.post("/withdraw", withdrawFunds);

app.post("/money_transfer", money_transfer);

// Account details
app.post("/account_details", getAccountDetails);

// Existing routes...
app.get("/", (req, res) => {
    res.json("Hello this is the backend");
});


app.post('/money-transfer', (req, res) => {
    const { sender_account_id, receiver_account_id, transfer_amount,description} = req.body;
  
    const query = `CALL MoneyTransfer(?, ?, ?)`;
  
    db.query(query, [sender_account_id, receiver_account_id, transfer_amount,description], (err, result) => {
      if (err) {
        console.error('Error during money transfer:', err);
        res.status(500).send('Money transfer failed');
      } else {
        res.status(200).json({ message: 'Money transfer successful', result });
      }
    });
  });


