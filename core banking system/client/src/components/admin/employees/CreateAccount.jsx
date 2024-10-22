// src/components/employee/CreateAccount.js
import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import api from '../../../services/api';
//import './CreateAccount.css';

const CreateAccount = () => {
  const [customerType, setCustomerType] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchId, setBranchId] = useState('');
  const [savingsPlanType, setSavingsPlanType] = useState('');
  const [fixedDeposit, setFixedDeposit] = useState(false);
  const [fdDetails, setFdDetails] = useState({
    savingsAccountNumber: '',
    fdAmount: '',
    fdPlan: '',
    startDate: '',
    endDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accountData = {
        customerType,
        accountType,
        accountNumber,
        branchId,
        savingsPlanType,
        fixedDeposit,
        fdDetails
      };
      const response = await api.post('/create_account', accountData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error creating account:', error);
      alert('Failed to create account');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Create Account
        </Typography>
        <form onSubmit={handleSubmit} className="create-account-form">
          <FormControl fullWidth margin="normal">
            <InputLabel>Customer Type</InputLabel>
            <Select value={customerType} onChange={(e) => setCustomerType(e.target.value)}>
              <MenuItem value="individual">Individual</MenuItem>
              <MenuItem value="organization">Organization</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Account Type</InputLabel>
            <Select value={accountType} onChange={(e) => setAccountType(e.target.value)}>
              <MenuItem value="savings">Savings</MenuItem>
              <MenuItem value="checking">Checking</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Branch ID"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
          />
          {accountType === 'savings' && (
            <TextField
              fullWidth
              margin="normal"
              label="Savings Plan Type"
              value={savingsPlanType}
              onChange={(e) => setSavingsPlanType(e.target.value)}
            />
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel>Fixed Deposit</InputLabel>
            <Select value={fixedDeposit} onChange={(e) => setFixedDeposit(e.target.value === 'true')}>
              <MenuItem value="false">No</MenuItem>
              <MenuItem value="true">Yes</MenuItem>
            </Select>
          </FormControl>
          {fixedDeposit && (
            <>
              <TextField
                fullWidth
                margin="normal"
                label="Savings Account Number"
                value={fdDetails.savingsAccountNumber}
                onChange={(e) => setFdDetails({ ...fdDetails, savingsAccountNumber: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Fixed Deposit Amount"
                value={fdDetails.fdAmount}
                onChange={(e) => setFdDetails({ ...fdDetails, fdAmount: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="FD Plan"
                value={fdDetails.fdPlan}
                onChange={(e) => setFdDetails({ ...fdDetails, fdPlan: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fdDetails.startDate}
                onChange={(e) => setFdDetails({ ...fdDetails, startDate: e.target.value })}
              />
              <TextField
                fullWidth
                margin="normal"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fdDetails.endDate}
                onChange={(e) => setFdDetails({ ...fdDetails, endDate: e.target.value })}
              />
            </>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Create Account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateAccount;