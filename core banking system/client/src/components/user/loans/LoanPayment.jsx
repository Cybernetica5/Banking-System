import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button } from '@mui/material';

const LoanPayment = () => {
  const [amount, setAmount] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Process the payment with the amount
    console.log(`Payment amount: ${amount}`);
    // Reset the input field
    setAmount('');
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Loan Payment
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Payment Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            fullWidth
            margin="normal"
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