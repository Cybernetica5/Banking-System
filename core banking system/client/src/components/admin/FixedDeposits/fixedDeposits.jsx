import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SnackbarAlert from '../../common/alert/SnackbarAlert';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import api from '../../../services/api';
import Cookies from 'js-cookie';
import './fixedDeposits.css';

const CreateFixedDeposit = () => {
  const [fdPlans, setfdPlans] = useState([]); // Initialize as an empty array
  const [fd_plan_id, setfd_plan_id] = useState('');
  const [accountNumber, setaccountNumber] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  // Snackbar alert
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  useEffect(() => {
    const fetchFDPlans = async () => {
      try {
        const response = await api.get('/staff/fdPlans');
        const fd_plans = response.data;
        console.log('FD Plan details:', fd_plans);
        setfdPlans(fd_plans);
      } catch (error) {
        console.error('Error fetching FD Plans:', error);
      }
    };

    fetchFDPlans();
  }, []);

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
    setfd_plan_id('');
    setaccountNumber('');
    setDepositAmount('');
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPlan = fdPlans.find(plan => plan.fd_plan_id === fd_plan_id);

    try {
      const fdData = {
        accountNumber,
        fd_plan: fd_plan_id,
        depositAmount,
        depositTerm: selectedPlan.duration,
        interestRate: selectedPlan.Interest_rate
      };
      const response = await api.post('/create_fixed_deposit', fdData);
      
      showMessage(response.data.message, 'success');
    } catch (error) {
      console.error('Error creating fixed deposit:', error);
      showMessage(error.response.data.message || 'Failed to create fixed deposit', 'error');
    }
  };

  return (
    <div className="create-account-container">
      <div className="form-container">
        <Typography variant="h6">Create Fixed Deposit</Typography>
        <form onSubmit={handleSubmit} className="create-account-form">
          <TextField
            fullWidth
            margin="normal"
            label="Savings Account Number"
            value={accountNumber}
            onChange={(e) => setaccountNumber(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>FD Plan</InputLabel>
            <Select value={fd_plan_id} onChange={(e) => setfd_plan_id(e.target.value)}>
              {fdPlans.map((plan) => (
                <MenuItem key={plan.fd_plan_id} value={plan.fd_plan_id}>
                  {plan.duration} months - {plan.Interest_rate}%
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Deposit Amount"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Deposit Term"
            value={fdPlans.find(plan => plan.fd_plan_id === fd_plan_id)?.duration || ''}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Interest Rate"
            value={fdPlans.find(plan => plan.fd_plan_id === fd_plan_id)?.Interest_rate || ''}
            disabled
          />
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
              Create Fixed Deposit
            </Button>
          </div>
        </form>
        
      </div>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={"Are you sure you want to create this fixed deposit?"}
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

export default CreateFixedDeposit;