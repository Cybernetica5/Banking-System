import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { TextField, Button, Typography, Card } from '@mui/material';
import SnackbarAlert from '../../common/alert/SnackbarAlert';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import api from '../../../services/api';

const branchId = Cookies.get('branchId');

const AddEmployee = () => {
  const [employeeData, setEmployeeData] = useState({
    userName: '',
    password: '',
    email: '',
    fullName: '',
    dateOfBirth: '',
    NIC: '',
    branchId: branchId
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
    addEmployee();
  };

  const handleCancelDialog = () => {
    handleCloseDialog();
  };

  const addEmployee = async () => {
    try {
      console.log('Adding employee:', employeeData);
      const response = await api.post('/addEmployee', employeeData);
      console.log('Response:', response.data);
      showMessage('Employee added successfully', 'success');
      setEmployeeData({
        userName: '',
        password: '',
        email: '',
        fullName: '',
        dateOfBirth: '',
        NIC: '',
        branchId: ''
      });
    } catch (error) {
      console.error('Error adding employee:', error);
      showMessage('Error adding employee', 'error');
    }
  };

  const handleAddEmployee = () => {
    // Validation: Ensure all fields are filled
    if (!employeeData.userName || !employeeData.password || !employeeData.email || 
        !employeeData.fullName || !employeeData.dateOfBirth || 
        !employeeData.NIC || !employeeData.branchId) {
      showMessage('All fields are required', 'error');
      return;
    }
    handleOpenDialog();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="add-employee-container" style={{ paddingBottom: '25px' }}>
      <Card sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: 4, marginTop: '20px'}}>
        <Typography variant="h6">Add Employee</Typography>

        <TextField
          label="Username"
          name="userName"
          value={employeeData.userName}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          value={employeeData.password}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Email"
          name="email"
          value={employeeData.email}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Full Name"
          name="fullName"
          value={employeeData.fullName}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={employeeData.dateOfBirth}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          onChange={handleInputChange}
        />

        <TextField
          label="NIC"
          name="NIC"
          value={employeeData.NIC}
          fullWidth
          margin="normal"
          onChange={handleInputChange}
        />

        <TextField
          label="Branch ID"
          name="branchId"
          type="number"
          value={employeeData.branchId}
          fullWidth
          disabled
          sx={{
            height: '56px', 
            '& input': { 
              height: '56px',
              fontSize: '16px'
              }
          }}

          margin="normal"
          onChange={handleInputChange}
        />

        <div className="button-container">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddEmployee}
          >
            Add Employee
          </Button>
        </div>
      </Card>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={"Are you sure you want to add this employee?"}
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

export default AddEmployee;
