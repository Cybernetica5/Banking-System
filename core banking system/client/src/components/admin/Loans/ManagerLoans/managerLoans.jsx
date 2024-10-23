import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Button 
} from '@mui/material';
import "./managerLoans.css";   

const ManagerLoans = () => {
  const [pendingLoans, setPendingLoans] = useState([]);

  // Fetch pending loans from the backend
  useEffect(() => {
    fetch('/loans')  // Assumes your backend API is running at /loans
      .then((response) => response.json())
      .then((data) => {
        setPendingLoans(data);
      })
      .catch((error) => {
        console.error('Error fetching loans:', error);
      });
  }, []);

  const handleApprove = (loanId) => {
    // Call backend to approve the loan
    fetch(`/loans/approve/${loanId}`, {
      method: 'POST',
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(`Loan approved: ${loanId}`);
      // Optionally, you can update the UI to reflect the approved status
      setPendingLoans(pendingLoans.filter(loan => loan.loan_id !== loanId)); // Remove the approved loan
    })
    .catch((error) => {
      console.error('Error approving loan:', error);
    });
  };

  return (
    <div className="loan-approval-container">
      <Typography variant="h4" gutterBottom>
        Pending Loans
      </Typography>
      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Applicant name</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingLoans.length > 0 ? (
                  pendingLoans.map((loan) => (
                    <TableRow key={loan.loan_id}>
                      <TableCell>{loan.start_date}</TableCell>
                      <TableCell>{loan.applicant || 'Unknown Applicant'}</TableCell>
                      <TableCell>{loan.account_id}</TableCell>
                      <TableCell align="right">${loan.amount.toFixed(2)}</TableCell>
                      <TableCell>
                        <Button 
                          variant="contained" 
                          color="primary" 
                          onClick={() => handleApprove(loan.loan_id)}
                        >
                          Approve
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No pending loans.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManagerLoans;
