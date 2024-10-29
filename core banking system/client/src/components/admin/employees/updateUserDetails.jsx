import React, { useState } from 'react';
import { TextField, Button, Typography, Card } from '@mui/material';
import SnackbarAlert from '../../common/alert/SnackbarAlert';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import api from '../../../services/api';

const UpdateEmployeeUserDetails = () => {
  const [userDetails, setUserDetails] = useState({
    staffId: '',
    userName: '',
    password: '',
    email: ''
  });

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
    updateUserDetails();
  };

  const handleCancelDialog = () => {
    handleCloseDialog();
  };

  const updateUserDetails = async () => {
    try {
      console.log('Updating user details:', userDetails);
      const response = await api.post('/updateStaffUserDetails', {
        staff_id: userDetails.staffId,
        user_name: userDetails.userName,
        password: userDetails.password,
        email: userDetails.email
      });
      console.log('Response:', response.data);
      showMessage('User details updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user details:', error);
      showMessage('Error updating user details', 'error');
    }
  };

  const handleUpdateUserDetails = () => {
    if (!userDetails.staffId || !userDetails.userName || !userDetails.password || !userDetails.email) {
      showMessage('Please fill in all fields', 'error');
      return;
    }
    handleOpenDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="update-user-details-container" style={{ paddingBottom: '25px' }}>
      <Card sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: 4, marginTop: '20px'}}>
        <Typography variant="h6">Update User Details</Typography>

        <TextField
          label="Staff ID"
          name="staffId"
          value={userDetails.staffId}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Username"
          name="userName"
          value={userDetails.userName}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={userDetails.password}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Email"
          name="email"
          type="email"
          value={userDetails.email}
          fullWidth
          // sx={{
          //   height: '56px', 
          //   '& input': { 
          //     height: '56px',
          //     fontSize: '16px'
          //     }
          // }}

          margin="normal"
          onChange={handleInputChange}
        />

        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdateUserDetails}
          >
            Update
          </Button>
        </div>
      </Card>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={"Are you sure you want to update this user's details?"}
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

export default UpdateEmployeeUserDetails;
