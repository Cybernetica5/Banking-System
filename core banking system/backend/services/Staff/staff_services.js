// backend/routes/accountRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // Assuming you have a db module to handle database connections

router.post('/create_account', async (req, res) => {
  const { customerType, accountType, accountNumber, branchId, savingsPlanType, fixedDeposit, fdDetails } = req.body;

  try {
    // Create account
    await db.query(
      `CALL create_account(?, ?, ?, ?, ?);`,
      [customerType, accountType, accountNumber, branchId, savingsPlanType]
    );

    if (fixedDeposit) {
      // Create fixed deposit
      await db.query(
        `CALL create_fixed_deposit(?, ?, ?, ?, ?);`,
        [fdDetails.savingsAccountNumber, fdDetails.fdAmount, fdDetails.fdPlan, fdDetails.startDate, fdDetails.endDate]
      );
    }

    res.json({ success: true, message: 'Account created successfully' });
  } catch (err) {
    console.error('Error creating account:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;