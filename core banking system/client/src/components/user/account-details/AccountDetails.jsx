import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const AccountDetails = () => {
  return (
    <div className="account-details-container">
      <Typography variant="h4" gutterBottom>
        Account Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Savings Account</Typography>
              <Typography>Account Number: XXXX-XXXX-1234</Typography>
              <Typography>Balance: $5,000.00</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Checking Account</Typography>
              <Typography>Account Number: XXXX-XXXX-5678</Typography>
              <Typography>Balance: $2,500.00</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AccountDetails;
