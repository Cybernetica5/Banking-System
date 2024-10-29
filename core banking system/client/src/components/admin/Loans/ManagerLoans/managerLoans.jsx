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

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ padding: '20px' }}>
      <Grid item xs={12} md={10}>
        <Card sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: 4, marginTop: '20px'}}>
          <Typography variant="h6" align="center" gutterBottom>
            Pending Loans
          </Typography>
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
                        <TableCell>{loan.account_id || 'Unknown Applicant'}</TableCell>
                        <TableCell align="right">
                          {loan.amount !== undefined && !isNaN(loan.amount) 
                            ? `$${parseFloat(loan.amount).toFixed(2)}` 
                            : 'N/A'}
                        </TableCell>
                        <TableCell>{loan.start_date ? new Date(loan.start_date).toLocaleDateString() : 'N/A'}</TableCell>
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
      </Grid>
    </Grid>
  );
};

export default ManagerLoans;
