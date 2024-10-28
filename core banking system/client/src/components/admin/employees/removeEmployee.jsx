import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import SnackbarAlert from '../../common/alert/SnackbarAlert';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import api from '../../../services/api';

const RemoveEmployee = () => {
  const [staffId, setStaffId] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);

  const showMessage = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleConfirm = () => {
    handleCloseDialog();
    removeEmployee();
  };

  const handleCancelDialog = () => {
    handleCloseDialog();
  };

  const removeEmployee = async () => {
    try {
      console.log('Removing employee with staff ID:', staffId);
      const response = await api.post('/removeEmployee', { staffId });
      console.log('Response:', response.data);
      showMessage('Employee removed successfully', 'success');
      setStaffId('');
    } catch (error) {
      console.error('Error removing employee:', error);
      showMessage('Error removing employee', 'error');
    }
  };

  const handleRemoveEmployee = () => {
    if (!staffId) {
      showMessage('Staff ID is required', 'error');
      return;
    }
    handleOpenDialog();
  };

  const handleInputChange = (e) => {
    setStaffId(e.target.value);
  };

  return (
    <div className="remove-employee-container" style={{ paddingBottom: '25px' }}>
      <div className="form-container">
        <Typography variant="h6">Remove Employee</Typography>

        <TextField
          label="Staff ID"
          name="staffId"
          value={staffId}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <div className="button-container">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleRemoveEmployee}
          >
            Remove Employee
          </Button>
        </div>
      </div>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={`Are you sure you want to remove employee with Staff ID: ${staffId}?`}
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

export default RemoveEmployee;
