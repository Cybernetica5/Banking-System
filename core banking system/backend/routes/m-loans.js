const express = require('express');
const router = express.Router();
const { getPendingLoans } = require('../services/ManagerLoans/manager-loans.js');


// Route for fetching pending loans
router.get('/api/manager-loans', async (req, res) => {
  try {
    const pendingLoans = await getPendingLoans(); // Fetch from your database
    res.json(pendingLoans); // Send the loans as a JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

module.exports = router;
