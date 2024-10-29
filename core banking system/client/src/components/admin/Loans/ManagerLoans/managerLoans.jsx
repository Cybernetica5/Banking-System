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
import api from '../../../../services/api';   

const ManagerLoans = () => {
  const [pendingLoans, setPendingLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get('/manager-loans');
        const data = response.data;
        setPendingLoans(data);
        console.log('Pending loans:', data);
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  const handleApprove = async (loanId) => {
    try {
      // Call backend to approve the loan
      const response = await api.post(`/manager-loans/approve/${loanId}`);
      console.log('Loan approval response:', response.data);
      
      setPendingLoans(pendingLoans.filter(loan => loan.loan_id !== loanId)); // Remove the approved loan
    } catch (error) {
      console.error('Error approving loan:', error);
    }
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
                      <TableCell align="right">
                        {loan.amount !== undefined && !isNaN(loan.amount) ? `$${loan.amount.toFixed(2)}` : 'N/A'}
                      </TableCell>
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