import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Grid, MenuItem } from '@mui/material';

const MoneyTransfer = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the transfer logic
    console.log('Transfer submitted:', { fromAccount, toAccount, amount });
    // Reset form or show confirmation
  };

  const accounts = [
    { value: 'savings', label: 'Savings Account (XXXX-1234)' },
    { value: 'checking', label: 'Checking Account (XXXX-5678)' },
  ];

  return (
    <div className="money-transfer-container">
      <Typography variant="h4" gutterBottom>
        Money Transfer
      </Typography>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="From Account"
                  value={fromAccount}
                  onChange={(e) => setFromAccount(e.target.value)}
                >
                  {accounts.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="To Account Number"
                  value={toAccount}
                  onChange={(e) => setToAccount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Transfer
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoneyTransfer;