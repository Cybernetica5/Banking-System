import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Card
} from '@mui/material';
import api from '../../../services/api'; // Assuming you have an API service for backend calls

const branchId = 2; // Assuming branch ID is fixed, you can adjust it dynamically as needed

const LatePaymentsReport = () => {
  const [latePayments, setLatePayments] = useState([]); // State to store the report data
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(null); // State to manage errors

  // Fetch late loan payments report on component mount
  useEffect(() => {
    const fetchLatePayments = async () => {
      setLoading(true); // Show loading indicator
      setError(null); // Reset error state

      try {
        const response = await api.post('/report/late_loan_payment', { branchId });
        setLatePayments(response.data.latePayments); // Save the fetched data
      } catch (error) {
        console.error('Error fetching late payments:', error);
        setError('Error fetching late payment report. Please try again later.');
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchLatePayments();
  }, []);

  return (
    <div>
      <Card style={{ padding: '16px', margin: '16px', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
        <Typography variant="h6">Late Loan Payment Report</Typography>

        {/* Loading Indicator */}
        {loading && (
          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <CircularProgress />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Typography color="error" variant="body1" style={{ textAlign: 'center', marginBottom: '16px' }}>
            {error}
          </Typography>
        )}

        {/* No Data Message */}
        {!loading && !error && latePayments.length === 0 && (
          <Typography variant="body1" style={{ textAlign: 'center', marginBottom: '16px' }}>
            No late payments found for this branch.
          </Typography>
        )}

        {/* Table to display late payments */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Loan ID</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latePayments.map((payment) => (
                <TableRow key={payment.loan_id}>
                  <TableCell>{payment.customer_id}</TableCell>
                  <TableCell>{payment.mobile_number}</TableCell>
                  <TableCell>{payment.account_number}</TableCell>
                  <TableCell>{payment.loan_id}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{new Date(payment.due_date).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default LatePaymentsReport;