import express from 'express';
import { getPendingLoans, approveLoan, rejectLoan } from '../services/ManagerLoans/manager-loans.js';
const router = express.Router();

// Route for fetching pending loans
router.get('/manager-loans', async (req, res) => {
  try {
    const pendingLoans = await getPendingLoans(); 
    res.json(pendingLoans); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch loans' });
  }
});

router.post('/manager-loans/approve', async (req, res) => {
  console.log('Approving loan:', req.body); // Log the request body
  let { loanId, approvedDate } = req.body.param;
  console.log(`Received loanId: ${loanId}, approvedDate: ${approvedDate}`); // Log the parameters
  loanId = parseInt(loanId);

  if (isNaN(loanId)) {
    return res.status(400).json({ error: 'Invalid loan ID' });
  }

  try {
    const result = await approveLoan(loanId, approvedDate);
    console.log(`approveLoan result:`, result); // Log the result

    if (result.error) {
      return res.status(500).json(result);
    }
    res.json(result);
  } catch (error) {
    console.error(`Error approving loan with ID ${loanId}:`, error);
    res.status(500).json({ error: 'Failed to approve loan' });
  }
});

router.post('/manager-loans/reject', async (req, res) => {
  console.log('Rejecting loan:', req.body); // Log the request body
  let { loanId } = req.body.param;
  console.log(`Received loanId: ${loanId}`); // Log the parameters
  loanId = parseInt(loanId);

  if (isNaN(loanId)) {
    return res.status(400).json({ error: 'Invalid loan ID' });
  }

  try {
    const result = await rejectLoan(loanId);
    console.log(`rejectLoan result:`, result); // Log the result

    if (result.error) {
      return res.status(500).json(result);
    }
    res.json(result);
  } catch (error) {
    console.error(`Error rejecting loan with ID ${loanId}:`, error);
    res.status(500).json({ error: 'Failed to reject loan' });
  }
});

export default router;