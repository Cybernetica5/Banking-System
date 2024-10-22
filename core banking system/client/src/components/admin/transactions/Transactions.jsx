import React, { useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import api from '../../../services/api';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import SnackbarAlert from '../../common/alert/SnackbarAlert';

const branchId = 1; // TODO: Get the branch ID from the logged-in user

const Transactions = () => {
  const [transactionType, setTransactionType] = useState('deposit'); // 'deposit' or 'withdrawal'
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleTransactionTypeChange = (e) => {
    setTransactionType(e.target.value);
    resetForm(); 
  };

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
    handleCloseDialog();
  };

  const validateForm = () => {
    // Validation checks
    if (!accountNumber || !amount || !description) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      showMessage('Please enter a valid amount', 'error');
      return;
    }
    handleOpenDialog();
  }

  const handleSubmit = async () => {
    try {
      const endpoint = transactionType === 'withdrawal' ? '/withdraw' : '/deposit';
      const response = await api.post(endpoint, {
          accountNumber,
          amount,
          description,
          branchId,
          transactionType
      });
      showMessage(response.data.message, 'success');
      resetForm(); 
    } catch (error) {
      showMessage(error.response.data.message, 'error');
    }
  };

  const resetForm = () => {
    setAccountNumber('');
    setAmount('');
    setDescription('');
  };

  return (
    <div className='transactions-container'>
      <Card className="form-container" sx={{ marginTop: '50px', maxWidth: '600px' }}>
        <CardContent>
          <Typography variant="h6">{transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'}</Typography>

          {/* Transaction Type Selector */}
          <FormControl fullWidth margin="normal">
            <InputLabel>Transaction Type</InputLabel>
            <Select
              value={transactionType}
              onChange={handleTransactionTypeChange}
              label="Transaction Type"
              align="left"
            >
              <MenuItem value="withdrawal">Withdrawal</MenuItem>
              <MenuItem value="deposit">Deposit</MenuItem>
            </Select>
          </FormControl>

          {/* Transaction Form */}
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              label="Account Number"
              fullWidth
              margin="normal"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
            <TextField
              label="Amount"
              type="number"
              fullWidth
              margin="normal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              sx={{
                height: '56px',
                '& input': {
                  height: '56px',
                  fontSize: '16px'
                }
              }}
            />
            <TextField
              label="Description"
              fullWidth
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            
            <div className="button-container">
              <Button
                variant="contained"
                startIcon={<CancelIcon />}
                sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
                style={{ marginRight: '8px' }}
                onClick={resetForm} // Cancel the changes by resetting the form
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                endIcon={<CheckCircleIcon />}
                sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
                onClick={validateForm} // Show the confirmation dialog
              >
                Confirm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={"Are you sure you want to proceed with the transaction?"}
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

export default Transactions;
