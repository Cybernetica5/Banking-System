import React, { useState } from 'react';
import { Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SnackbarAlert from '../../common/alert/SnackbarAlert';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import api from '../../../services/api';
import './CreateAccount.css';

const CreateAccount = () => {
  const [customerType, setCustomerType] = useState('');
  const [accountType, setAccountType] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [branchId, setBranchId] = useState('');
  const [savingsPlanType, setSavingsPlanType] = useState('');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [fdDetails, setFdDetails] = useState({
    savingsAccountNumber: '',
    fdAmount: '',
    fdPlan: '',
    startDate: '',
    endDate: ''
  });

  // Snackbar alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const showMessage = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Confirmation dialog
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    handleCloseDialog();
    handleSubmit();
  };

  const handleCancelDialog = () => {
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setCustomerType('');
    setAccountType('');
    setAccountNumber('');
    setBranchId('');
    setSavingsPlanType('');
    setInitialDeposit('');
    setIdNumber('');
    setFdDetails({
      savingsAccountNumber: '',
      fdAmount: '',
      fdPlan: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate initial deposit for savings accounts
    if (accountType === 'savings') {
      const minDeposit = getMinimumDeposit(savingsPlanType);
      if (parseFloat(initialDeposit) < minDeposit) {
        showMessage(`Initial deposit must be at least $${minDeposit}`, 'error');
        return;
      }
    }

    // Validate ID number matches account number
    if (idNumber !== accountNumber) {
      showMessage('ID number does not match account number', 'error');
      return;
    }

    try {
      const accountData = {
        customerType,
        accountType,
        accountNumber,
        branchId,
        savingsPlanType,
        initialDeposit,
        idNumber,
        fdDetails
      };
      const response = await api.post('/create_account', accountData);
      showMessage(response.data.message, 'success');
    } catch (error) {
      console.error('Error creating account:', error);
      showMessage('Failed to create account', 'error');
    }
  };

  const getMinimumDeposit = (planType) => {
    switch (planType) {
      case 'children':
        return 0;
      case 'teen':
        return 500;
      case 'adult':
      case 'senior':
        return 1000;
      default:
        return 0;
    }
  };

  const handleFdPlanChange = (e) => {
    const fdPlan = e.target.value;
    setFdDetails({ ...fdDetails, fdPlan });
    if (fdDetails.startDate) {
      calculateEndDate(fdDetails.startDate, fdPlan);
    }
  };

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setFdDetails({ ...fdDetails, startDate });
    if (fdDetails.fdPlan) {
      calculateEndDate(startDate, fdDetails.fdPlan);
    }
  };

  const calculateEndDate = (startDate, fdPlan) => {
    const start = new Date(startDate);
    let end;
    switch (fdPlan) {
      case '6_months':
        end = new Date(start.setMonth(start.getMonth() + 6));
        break;
      case '1_year':
        end = new Date(start.setFullYear(start.getFullYear() + 1));
        break;
      case '3_years':
        end = new Date(start.setFullYear(start.getFullYear() + 3));
        break;
      default:
        end = '';
    }
    setFdDetails({ ...fdDetails, endDate: end.toISOString().split('T')[0] });
  };

  return (
    <div className="create-account-container">
      <div className="form-container">
        <Typography variant="h6">Create Account</Typography>
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
              <MenuItem value="fixed_deposit">Fixed Deposit</MenuItem>
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
            label="Branch Name"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="ID Number"
            value={idNumber}
            onChange={(e) => setIdNumber(e.target.value)}
          />
          {accountType === 'savings' && (
            <>
              <FormControl fullWidth margin="normal">
                <InputLabel>Savings Plan Type</InputLabel>
                <Select value={savingsPlanType} onChange={(e) => setSavingsPlanType(e.target.value)}>
                  <MenuItem value="children">Children - 12%, no minimum</MenuItem>
                  <MenuItem value="teen">Teen - 11%, $500 minimum</MenuItem>
                  <MenuItem value="adult">Adult (18+) - 10%, $1000 minimum</MenuItem>
                  <MenuItem value="senior">Senior (60+) - 13%, $1000 minimum</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Initial Deposit"
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
              />
            </>
          )}
          {accountType === 'fixed_deposit' && (
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
              <FormControl fullWidth margin="normal">
                <InputLabel>FD Plan</InputLabel>
                <Select value={fdDetails.fdPlan} onChange={handleFdPlanChange}>
                  <MenuItem value="6_months">6 months, 13%</MenuItem>
                  <MenuItem value="1_year">1 year, 14%</MenuItem>
                  <MenuItem value="3_years">3 years, 15%</MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                margin="normal"
                label="Start Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fdDetails.startDate}
                onChange={handleStartDateChange}
              />
              <TextField
                fullWidth
                margin="normal"
                label="End Date"
                type="date"
                InputLabelProps={{ shrink: true }}
                value={fdDetails.endDate}
                disabled
              />
            </>
          )}
          <div className="button-container">
            <Button
              variant="contained"
              startIcon={<CancelIcon />}
              sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
              style={{ marginRight: '8px' }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              endIcon={<AddCircleIcon />}
              sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={"Are you sure you want to create this account?"}
        onConfirm={handleConfirm}
        onCancel={handleCancelDialog}
      />

      <SnackbarAlert
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
};

export default CreateAccount;