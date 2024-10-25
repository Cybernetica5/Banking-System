import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './services/Config/database.js';
import { getLoanDetails, getCreditLimit, applyLoan } from './services/Loan/loan_services.js';
import { money_transfer } from './services/MoneyTransfer/money_transfer.js';
import { getAccounts, getAccountSummary } from './services/AccountManagement/account_details.js';
import authRoutes from './services/Authentication/login.js';
import protectedRoutes from './routes/protected.js';
import refreshRoutes from './routes/referesh.js';
import authenticateToken from './middleware/auth.js';
import { addIndividualCustomer, addOrganizationCustomer ,getCustomerDetails } from './services/Customers/customer_services.js';
import { getTransactionReport , getLateLoanPaymentReport} from './services/Reports/report_services.js';
import { depositFunds, withdrawFunds } from './services/Transactions/transaction_services.js';
import { getAccountDetails } from './services/Accounts/account_services.js';    
import { logout } from './services/Authentication/logout.js';
import { getUserInfo, updateUserInfo, changeUserPassword } from './services/User/user_services.js';

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


// Routes
app.use('/auth', authRoutes);
app.use('/api', authenticateToken, protectedRoutes);
app.use('/refresh', refreshRoutes);

// Define routes using async functions
app.get("/accounts", getAccounts);
app.get("/accounts_summary", getAccountSummary);
app.get("/loan_details", getLoanDetails);
app.get("/credit-limit", getCreditLimit);

//app.get("/recent_transactions/:customerId", getRecentTransactions);


// User info
app.get("/user_info/:userId", getUserInfo);
app.put("/user_info/:userId", updateUserInfo);

// Change password
app.put("/change_password/:userId", changeUserPassword);

//Loan
app.post("/apply_loan", applyLoan);

// Reports
app.post("/report/transaction", getTransactionReport);
app.post("/report/late_loan_payment", getLateLoanPaymentReport);


// Customer
app.post("/add-customer/individual", addIndividualCustomer);
app.post("/add-customer/organization", addOrganizationCustomer);
app.post("/customer-details", getCustomerDetails);

//logout
app.post("/logout", logout);

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


