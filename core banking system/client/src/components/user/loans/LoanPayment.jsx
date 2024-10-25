import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import api from '../../../services/api';
import Cookies from 'js-cookie';

const LoanPayment = () => {
  const [amount, setAmount] = useState('');
  const [loanId, setLoanId] = useState('');
  const [installmentId, setInstallmentId] = useState('');
  const [loanDetails, setLoanDetails] = useState([]);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const userId = Cookies.get('userId');
        const response = await api.get('/loan_details', { params: { userId } });
        const approvedLoans = response.data.filter(loan => loan.status === 'approved');
        setLoanDetails(approvedLoans);
        console.log('Approved loan details:', approvedLoans);
      } catch (error) {
        console.error('Error fetching loan details:', error);
      }
    };

    fetchLoanDetails();
  }, []);

  useEffect(() => {
    const fetchInstallmentAmount = async () => {
      if (loanId) {
        try {
          const response = await api.get(`/installment`, {params: { loanId }});
          setAmount(response.data.amount);
          setInstallmentId(response.data.installment_id);
          console.log('Installment amount:', response.data.amount);
          console.log('Installment ID:', response.data.installment_id);
        } catch (error) {
          console.error('Error fetching installment amount:', error);
        }
      }
    };

    fetchInstallmentAmount();
  }, [loanId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/pay_loan', { installment_id: installmentId, amount });
      console.log(`Payment of ${amount} for loan ID ${loanId} processed successfully.`);
      // Reset the input fields
      setAmount('');
      setLoanId('');
    } catch (error) {
      console.error('Error processing loan payment:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Loan Payment
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Choose Loan</InputLabel>
            <Select
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              label="Choose Loan"
            >
              {loanDetails.map((loan) => (
                <MenuItem key={loan.loan_id} value={loan.loan_id}>
                  {loan.loan_type} - {loan.loan_id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Payment Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
            disabled
          />
          <Button type="submit" variant="contained" color="primary">
            Pay Installment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoanPayment;