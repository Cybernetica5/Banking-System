import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import db from '../Config/database.js';

dotenv.config();
const router = express.Router();
router.use(cookieParser());

router.post('/create_account', async (req, res) => {
  const { customerType, accountType, branchId, savingsPlanTypeId, initialDeposit, idNumber, licenseNumber } = req.body;

  try {
    // Validate required fields
    if (!customerType || !accountType || !branchId || (!idNumber && !licenseNumber) || !savingsPlanTypeId) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    console.log('Creating account:', req.body);

    // Check if ID number or license number exists in the customer table
    let customerId;
    if (customerType === 'individual') {
      const [customerRows] = await db.query('SELECT customer_id FROM individual WHERE NIC = ?', [idNumber]);
      if (customerRows.length === 0) {
        return res.status(400).json({ success: false, message: 'ID number not found in the customer table' });
      }
      customerId = customerRows[0].customer_id;
    } else {
      const [customerRows] = await db.query('SELECT customer_id FROM organization WHERE license_number = ?', [licenseNumber]);
      if (customerRows.length === 0) {
        return res.status(400).json({ success: false, message: 'License number not found in the customer table' });
      }
      customerId = customerRows[0].customer_id;
    }

    console.log('Customer ID:', customerId);

    // Create account and get the generated account number
    let accountNumber;
if (accountType === 'savings') {
  await db.query(
    `CALL create_savings_account(?, ?, ?, ?, @new_account_number);`,
    [customerId, branchId, initialDeposit, savingsPlanTypeId]
  );
  const [result] = await db.query(`SELECT @new_account_number AS account_number;`);
  accountNumber = result[0].account_number;
  console.log('Savings Account number:', accountNumber);
} else if (accountType === 'checking') {
  await db.query(
    `CALL create_checking_account(?, ?, ?, @new_account_number);`,
    [customerId, branchId, initialDeposit]
  );
  const [result] = await db.query(`SELECT @new_account_number AS account_number;`);
  accountNumber = result[0].account_number;
  console.log('Checking Account number:', accountNumber);
}

// Update the initial deposit
await db.query(
  `UPDATE account SET balance = ? WHERE account_number = ?`,
  [initialDeposit, accountNumber]
);

    res.json({ success: true, message: 'Account created successfully', accountNumber });
    customerType = '';
    accountType = '';
    branchId = '';
    savingsPlanTypeId = '';
    initialDeposit = '';
    idNumber = '';
    licenseNumber = '';
    
  } catch (err) {
    console.error('Error creating account:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/branch_name', async (req, res) => {
  const { staffId, staff_role } = req.query;
  console.log("staffID: ", staffId);
  console.log("staff role: ", staff_role);

  try {
    // Check if the staff is an employee
    console.log("GETTING BRANCH NAME");

    if (staff_role === 'employee') {
      const [employeeRows] = await db.query(
        `SELECT b.name AS branchName, e.branch_id
         FROM employee e
         JOIN branch b ON e.branch_id = b.branch_id
         WHERE e.staff_id = ?`,
        [staffId]
      );

      if (employeeRows.length > 0) {
        console.log("Branch ID:" , employeeRows[0].branch_id);
        return res.json({ branchName: employeeRows[0].branchName, branchId: employeeRows[0].branch_id });
      }
    }

    // Check if the staff is a manager
    if (staff_role === 'manager') {
      const [managerRows] = await db.query(
        `SELECT b.name AS branchName, b.branch_id
         FROM branch b
         WHERE b.manager_id = ?`,
        [staffId]
      );

      if (managerRows.length > 0) {
        console.log("Branch ID:" , managerRows[0].branch_id);
        return res.json({ branchName: managerRows[0].branchName, branchId: managerRows[0].branch_id });
      }
    }
    console.log("Branch not found");
    res.status(404).json({ error: 'Branch not found' });
  } catch (err) {
    console.error('Error fetching branch name:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/fdPlans', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM fd_plan');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching FD plans:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;