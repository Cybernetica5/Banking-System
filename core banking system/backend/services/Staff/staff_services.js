// backend/routes/accountRoutes.js
import db from '../Config/database.js';


// backend/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.post('/create_account', async (req, res) => {
  const { customerType, accountType, branchId, savingsPlanType, initialDeposit, idNumber, licenseNumber } = req.body;

  try {
    // Validate required fields
    if (!customerType || !accountType || !branchId || (!idNumber && !licenseNumber)) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    // if (!customerType || !accountType || (!idNumber && !licenseNumber)) {
    //   return res.status(400).json({ success: false, message: 'Missing required fields' });
    // }

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

    // Create account and get the generated account number
    if (accountType === 'savings') {
      const [result] = await db.query(
        `CALL create_savings_account(?, ?, ?, ?, @new_account_number); SELECT @new_account_number AS account_number;`,
        [customerId, branchId, savingsPlanType, initialDeposit]
      );

      const accountNumber = result[1][0].account_number;
      return res.json({ success: true, message: 'Account created successfully', accountNumber });
    }
    if (accountType === 'checking') {
      const [result] = await db.query(
        `CALL create_checking_account(?, ?, ?, @new_account_number); SELECT @new_account_number AS account_number;`,
        [customerId, branchId, initialDeposit]
      );

      const accountNumber = result[1][0].account_number;
      return res.json({ success: true, message: 'Account created successfully', accountNumber });
    }

     // Update the initial deposit
     await db.query(
      `UPDATE account SET balance = ? WHERE account_number = ?`,
      [initialDeposit, accountNumber]
    );

    res.json({ success: true, message: 'Account created successfully', accountNumber });
  } catch (err) {
    console.error('Error creating account:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/branch_name', async (req, res) => {
  const { staffId } = req.query;

  try {
    // Check if the staff is an employee
    const [employeeRows] = await db.query(
      `SELECT b.name AS branchName
       FROM employee e
       JOIN branch b ON e.branch_id = b.branch_id
       WHERE e.staff_id = ?`,
      [staffId]
    );

    if (employeeRows.length > 0) {
      return res.json({ branchName: employeeRows[0].branchName });
    }

    // Check if the staff is a manager
    const [managerRows] = await db.query(
      `SELECT b.name AS branchName
       FROM branch b
       WHERE b.manager_id = ?`,
      [staffId]
    );

    if (managerRows.length > 0) {
      return res.json({ branchName: managerRows[0].branchName });
    }

    res.status(404).json({ error: 'Branch not found' });
  } catch (err) {
    console.error('Error fetching branch name:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;