import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './services/Config/database.js';
import { getLoanDetails, getCreditLimit } from './services/Loan/loan_services.js';
import { addIndividualCustomer, addOrganizationCustomer } from './services/Customers/customer_services.js';
import { getTransactionReport } from './services/Reports/report_services.js';
import { depositFunds, withdrawFunds } from './services/Transactions/transaction_services.js';
import {addEmployee} from './services/emplyees/employee_services.js'

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
    console.log('Connected to backend!.....Server is running on http://localhost:8800');
});

// Routes
// app.use('/auth', authRoutes);
// app.use('/api', protectedRoutes);

// Async functions to handle requests
async function getAccounts(req, res) {
    try {
        const [rows] = await db.query("SELECT * FROM account");
        res.json(rows);
    } catch (err) {
        console.error('Error fetching accounts:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getAccountSummary(req, res) {
    try {
        const [rows] = await db.query(
            "SELECT * FROM bank_database.accounts_summary WHERE customer_id = ?",
            [req.query.customer_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching account summary:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function getRecentTransactions(req, res) {
    try {
        const [rows] = await db.query(
            "SELECT transaction_id, date, transaction_type, amount, description FROM bank_database.transaction_history WHERE customer_id = ? LIMIT 3",
            [req.query.customer_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching account summary:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
async function getTransactionsHistory(req, res) {
    try {
        const [rows] = await db.query(
            "SELECT transaction_id, date, transaction_type, amount, description FROM bank_database.transaction_history WHERE customer_id = ?",
            [req.query.customer_id]
        );
        res.json(rows);
    } catch (err) {
        console.error('Error fetching account summary:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}


async function login(req, res) {
    const { user_name, password } = req.body;
    try {
        const [rows] = await db.query(
            "SELECT * FROM user WHERE user_name = ? AND password = ?",
            [user_name, password]
        );
        if (rows.length > 0) {
            const user = rows[0];
            res.json({ 
                success: true, 
                user: { 
                    id: user.user_id, 
                    user_name: user.user_name, 
                    role: user.role 
                } 
            });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function signup(req, res) {
    const { account_number, user_name, email, password } = req.body;
    const query = `CALL register_user(?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [account_number, user_name, email, password]);
        res.status(200).json({ message: result[0].message });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

async function money_transfer(req, res) {
    const { sender_account_id, receiver_account_id, transfer_amount, description } = req.body;

    const query = `CALL MoneyTransfer(?, ?, ?, ?)`;

    try {
        const [result] = await db.query(query, [sender_account_id, receiver_account_id, transfer_amount, description]);
        res.status(200).json({ message: 'Money transfer successful', result });
    } catch (err) {
        console.error('Error during money transfer:', err);
        res.status(500).send('Money transfer failed');
    }
}

// Define routes using async functions
app.get("/accounts", getAccounts);
app.get("/accounts_summary", getAccountSummary);
app.post("/login", login);
app.get("/loan_details", getLoanDetails);
app.get("/credit-limit", getCreditLimit);

app.get("/recent_transactions", getRecentTransactions);
app.get("/transaction_History", getTransactionsHistory);

// Reports
app.post("/report/transaction", getTransactionReport);
//shashanka
app.post("add-employee",addEmployee);

app.post("/add-customer/individual", addIndividualCustomer);
app.post("/add-customer/organization", addOrganizationCustomer);

// Transactions
app.post("/deposit", depositFunds);
app.post("/withdraw", withdrawFunds);

app.post("/money_transfer", money_transfer);

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


