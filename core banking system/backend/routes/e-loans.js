const express = require('express');
const router = express.Router();
import { employee_loans } from '../services/EmployeeLoans/employee-loans.js';


router.post('/api/employee-loans', employee_loans);

export default  router;
