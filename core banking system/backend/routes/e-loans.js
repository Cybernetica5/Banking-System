const express = require('express');
const router = express.Router();
const { employee_loans } = require('../services/EmployeeLoans/employee-loans.js');

// Update to POST to match frontend form submission
router.post('/api/employee-loans', employee_loans);

module.exports = router;
