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
  Button,
  Grid
} from '@mui/material';
// import "./managerLoans.css";
import api from '../../../../services/api';

const ManagerLoans = () => {
  const [pendingLoans, setPendingLoans] = useState([]);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await api.get('manager/manager-loans');
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
    const approvedDate = new Date().toISOString().split("T")[0]; // Current date as approved date
    console.log('Approving loan:', loanId, approvedDate);

    try {
      const response = await api.post(`manager/manager-loans/approve`, { param: { loanId, approvedDate } });
      console.log('Loan approval response:', response.data);
      
      // Remove approved loan from the list
      setPendingLoans(pendingLoans.filter(loan => loan.loan_id !== loanId)); 
    } catch (error) {
      console.error('Error approving loan:', error);
    }    
    
  };

  const handleReject = async (loanId) => {
    console.log('Rejecting loan:', loanId);
    try {
      // Call backend to reject the loan
      const response = await api.post(`manager/manager-loans/reject`, {param:{ loanId }});
      console.log('Loan rejection response:', response.data);
      
      // Remove the rejected loan from the list
      setPendingLoans(pendingLoans.filter(loan => loan.loan_id !== loanId)); 
    } catch (error) {
      console.error('Error rejecting loan:', error);
    }
  }

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
                  <TableCell>Loan ID</TableCell>
                  <TableCell>Account ID</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pendingLoans.length > 0 ? (
                  pendingLoans.map((loan) => (
                    <TableRow key={loan.loan_id}>
                      <TableCell>{loan.loan_id}</TableCell>
                      <TableCell>{loan.account_id !== null ? loan.account_id : 'Unknown Applicant'}</TableCell>
                      <TableCell align="right">
                        {loan.amount !== undefined && !isNaN(loan.amount) ? `$${parseFloat(loan.amount).toFixed(2)}` : 'N/A'}
                      </TableCell>
                      <TableCell>{loan.start_date ? new Date(loan.start_date).toLocaleDateString() : 'N/A'}</TableCell>
                      <TableCell>
                          <Button
                          variant="contained"
                          color="primary"
                          sx={{ marginRight: '10px' }} // Adds gap to the right of the Approve button
                          onClick={() => handleApprove(loan.loan_id)}
                          >
                          Approve
                          </Button>
                          <Button
                          variant="contained"
                          sx={{
                          backgroundColor: 'red',
                          color: 'white',
                          '&:hover': {
                          backgroundColor: '#b30000', // Darker shade of red on hover
                          },
                          }}
                          onClick={() => handleReject(loan.loan_id)}
                          >
                          Reject
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
