import React, { useState, useEffect } from 'react'; 
import { Typography, TextField, Button, MenuItem, FormControl, InputLabel, Select, Autocomplete} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SnackbarAlert from '../../common/alert/SnackbarAlert';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import api from '../../../services/api';
import './fixedDeposits.css';

const CreateFixedDeposit = () => {
  const [fdPlans, setFdPlans] = useState([]);
  const [fdPlanId, setFdPlanId] = useState('');
  const [savingsAccounts, setSavingsAccounts] = useState([]);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [depositAmount, setDepositAmount] = useState('');

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');

  const [dialogOpen, setDialogOpen] = useState(false);
  
  

  useEffect(() => {
    const fetchFDPlans = async () => {
      try {
        const response = await api.get('/staff/fdPlans');
        setFdPlans(response.data);
      } catch (error) {
        console.error('Error fetching FD Plans:', error);
      }
    };

    fetchFDPlans();
 
  }, []);

  useEffect(() => {
    const fetchSavingsAccounts = async () => {
      try {
        const response = await api.get('/savings_accounts');
        console.log('API Response:', response.data); // Log the raw response
  
        const data = Array.isArray(response.data.data) ? response.data.data : [];
        setSavingsAccounts(data);
  
      } catch (error) {
        console.error('Error fetching savings accounts:', error);
        setSavingsAccounts([]); // Set as empty array on error to avoid null issues
      }
    };
  
    fetchSavingsAccounts();
  }, []);
  

  const showMessage = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // const handleOpenDialog = () => {
  //   setDialogOpen(true);
  // };

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
    setFdPlanId('');
    setAccountNumber('');
    setAccountName('');
    setDepositAmount('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedPlan = fdPlans.find(plan => plan.fd_plan_id === fdPlanId);

    if (!selectedPlan) {
      showMessage('Invalid FD Plan selected', 'error');
      return;
    }

    try {
      const fdData = {
        accountNumber,
        amount: depositAmount,
        duration: selectedPlan.duration,
        fd_plan_id: fdPlanId,
      };
      const response = await api.post('/create_fixed_deposit', fdData);
      showMessage(response.data.message, 'success');
      handleCancel();
      
    } catch (error) {
      console.error('Error creating fixed deposit:', error);
      showMessage(error.response?.data?.message || 'Failed to create fixed deposit', 'error');
    }
  };

  return (
    <div className="create-account-container">
      <div className="form-container">
        <Typography variant="h6">Create Fixed Deposit</Typography>
        <form onSubmit={handleSubmit} >
          <FormControl fullWidth margin="normal">
            <Autocomplete
              options={savingsAccounts}
              getOptionLabel={(option) => `${option.account_number}`}
              value={savingsAccounts.find(account => account.account_number === accountNumber) || null}
              onChange={(event, newValue) => {
                if (newValue) {
                  setAccountNumber(newValue.account_number);
                  setAccountName(newValue.name);
                  console.log('Selected account:', newValue.account_number, newValue.name);
                } else {
                  setAccountNumber('');
                  setAccountName('');
                  console.log('No account selected');
                }
              }}
              renderInput={(params) => {
                console.log('Rendering Autocomplete with options:', savingsAccounts);
                return <TextField {...params} label="Savings Account Number" />;
              }}
            />
          </FormControl>
          <TextField
            fullWidth
            margin="normal"
            label="Account Name"
            value={accountName}
            disabled
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>FD Plan</InputLabel>
            <Select value={fdPlanId} onChange={(e) => setFdPlanId(e.target.value)}>
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
            value={fdPlans.find(plan => plan.fd_plan_id === fdPlanId)?.duration || ''}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Interest Rate"
            value={fdPlans.find(plan => plan.fd_plan_id === fdPlanId)?.Interest_rate || ''}
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
