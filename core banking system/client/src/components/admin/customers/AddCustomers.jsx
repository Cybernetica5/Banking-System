import React, { useState } from 'react';
import { TextField, Button, RadioGroup, Radio, FormControlLabel, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SnackbarAlert from '../../common/alert/SnackbarAlert';
import ConfirmationDialog from '../../common/confirmation-dialog/ConfirmationDialog';
import api from '../../../services/api';

const userId = 1; // TODO: make this dynamic

const branchId = 1; // TODO: make this dynamic

const AddCustomer = () => {
  const [individualCustomerInfo, setIndividualCustomerInfo] = useState({
    branchId: branchId,
    fullName: '',
    dateOfBirth: '',
    NIC: '',
    address: '',
    mobileNumber: '',
    landlineNumber: '',
    accountType: 'savings' // Default account type
  });

  const [organizationCustomerInfo, setOrganizationCustomerInfo] = useState({
    branchId: branchId,
    name: '',
    licenseNumber: '',
    address: '',
    mobileNumber: '',
    landlineNumber: '',
    accountType: 'savings' // Default account type
  });

  const [customerType, setCustomerType] = useState('individual');
  
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
    AddCustomer();
  };

  const handleCancelDialog = () => {
    handleCloseDialog();
  };

  const handleCancel = () => {
    setIndividualCustomerInfo({
      fullName: '',
      dateOfBirth: '',
      NIC: '',
      address: '',
      mobileNumber: '',
      landlineNumber: '',
      accountType: 'savings'
    });

    setOrganizationCustomerInfo({
      name: '',
      licenseNumber: '',
      address: '',
      mobileNumber: '',
      landlineNumber: '',
      accountType: 'savings'
    });
  };

  const validateData = (customerType, individualCustomerInfo, organizationCustomerInfo) => {
    if (customerType === 'individual') {
      const requiredFields = ['fullName', 'dateOfBirth', 'NIC', 'address', 'mobileNumber', 'landlineNumber', 'accountType'];
      for (const field of requiredFields) {
        if (!individualCustomerInfo[field]) {
          showMessage(`${field.replace(/([A-Z])/g, ' $1')} is required.`, 'error');
          return false;
        }
      }
    } else if (customerType === 'organization') {
      const requiredFields = ['name', 'licenseNumber', 'address', 'mobileNumber', 'landlineNumber', 'accountType'];
      for (const field of requiredFields) {
        if (!organizationCustomerInfo[field]) {
          showMessage(`${field.replace(/([A-Z])/g, ' $1')} is required.`, 'error');
          return false;
        }
      }
    }
    return true;
  };
  
  const handleAddCustomer = () => {
    if (validateData(customerType, individualCustomerInfo, organizationCustomerInfo)) {
      handleOpenDialog();
    }
  };

  const AddCustomer = async () => {
    if (customerType === 'individual') {
     try {
       console.log('Adding individual customer:', individualCustomerInfo);
       const response = await api.post('/add-customer/individual', individualCustomerInfo);
       console.log('Response:', response.data);
       showMessage('Customer added successfully', 'success');
 
     } catch (error) {
        console.error('Error adding individual customer:', error);
        showMessage('Error adding customer', 'error');
     }
  
    } else {
      try {
        console.log('Adding organization customer:', organizationCustomerInfo);
        const response = await api.post('/add-customer/organization', organizationCustomerInfo);
        console.log('Response:', response.data);
        showMessage('Customer added successfully', 'success');
  
      } catch (error) {
        console.error('Error adding organization customer:', error);
        showMessage('Error adding customer', 'error');
      }
    };
  };

  return (
    <div className="add-customer-container" style={{ paddingBottom: '25px' }}>
      <div className="form-container">
        <Typography variant="h6">Add Customer</Typography>

        {/* Customer Type Selector */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Customer Type</InputLabel>
          <Select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
            label="Customer Type"
            align="left"
          >
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="organization">Organization</MenuItem>
          </Select>
        </FormControl>

        {/* Individual Customer Form */}
        {customerType === 'individual' && (
          <form className="individual-customer-form" noValidate>
            <TextField
              label="Full Name"
              id="full-name"
              name="full-name"
              value={individualCustomerInfo.fullName}
              fullWidth
              margin="normal"
              onChange={(e) => setIndividualCustomerInfo({ ...individualCustomerInfo, fullName: e.target.value })}
            />

            <TextField
              label="Date of Birth"
              id="date-of-birth"
              name="date-of-birth"
              type="date"
              value={individualCustomerInfo.dateOfBirth}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setIndividualCustomerInfo({ ...individualCustomerInfo, dateOfBirth: e.target.value })}
            />

            <TextField
              label="NIC"
              id="nic"
              name="nic"
              value={individualCustomerInfo.NIC}
              fullWidth
              margin="normal"
              onChange={(e) => setIndividualCustomerInfo({ ...individualCustomerInfo, NIC: e.target.value })}
            />

            <TextField
              label="Address"
              id="address"
              name="address"
              value={individualCustomerInfo.address}
              fullWidth
              margin="normal"
              onChange={(e) => setIndividualCustomerInfo({ ...individualCustomerInfo, address: e.target.value })}
            />

            <div className="phone-numbers-container">
              <TextField
                label="Phone number (Mobile)"
                id="mobile-number"
                name="mobile-number"
                type="tel"
                value={individualCustomerInfo.mobileNumber}
                fullWidth
                margin="normal"
                style={{ marginRight: '8px' }}
                onChange={(e) => setIndividualCustomerInfo({ ...individualCustomerInfo, mobileNumber: e.target.value })}
              />

              <TextField
                label="Phone number (Home)"
                id="home-number"
                name="home-number"
                type="tel"
                value={individualCustomerInfo.landlineNumber}
                fullWidth
                margin="normal"
                onChange={(e) => setIndividualCustomerInfo({ ...individualCustomerInfo, landlineNumber: e.target.value })}
              />
            </div>

            <RadioGroup
              row
              name="account-type"
              value={individualCustomerInfo.accountType}
              onChange={(e) => setIndividualCustomerInfo({ ...individualCustomerInfo, accountType: e.target.value })}
              style={{ marginTop: '8px' }}
            >
              <FormControlLabel value="savings" control={<Radio />} label="Saving" />
              <FormControlLabel value="checking" control={<Radio />} label="Checking" />
            </RadioGroup>
          </form>
        )}

        {/* Organization Customer Form */}
        {customerType === 'organization' && (
          <form className="organization-customer-form" noValidate>
            <TextField
              label="Name"
              id="name"
              name="name"
              value={organizationCustomerInfo.name}
              fullWidth
              margin="normal"
              onChange={(e) => setOrganizationCustomerInfo({ ...organizationCustomerInfo, name: e.target.value })}
            />

            <TextField
              label="License Number"
              id="license-number"
              name="license-number"
              value={organizationCustomerInfo.licenseNumber}
              fullWidth
              margin="normal"
              onChange={(e) => setOrganizationCustomerInfo({ ...organizationCustomerInfo, licenseNumber: e.target.value })}
            />

            <TextField
              label="Address"
              id="address"
              name="address"
              value={organizationCustomerInfo.address}
              fullWidth
              margin="normal"
              onChange={(e) => setOrganizationCustomerInfo({ ...organizationCustomerInfo, address: e.target.value })}
            />

            <div className="phone-numbers-container">
              <TextField
                label="Phone number (Mobile)"
                id="mobile-number"
                name="mobile-number"
                type="tel"
                value={organizationCustomerInfo.mobileNumber}
                fullWidth
                margin="normal"
                style={{ marginRight: '8px' }}
                onChange={(e) => setOrganizationCustomerInfo({ ...organizationCustomerInfo, mobileNumber: e.target.value })}
              />

              <TextField
                label="Phone number (Home)"
                id="home-number"
                name="home-number"
                type="tel"
                value={organizationCustomerInfo.landlineNumber}
                fullWidth
                margin="normal"
                onChange={(e) => setOrganizationCustomerInfo({ ...organizationCustomerInfo, landlineNumber: e.target.value })}
              />
            </div>

            <RadioGroup
              row
              name="account-type"
              value={organizationCustomerInfo.accountType}
              onChange={(e) => setOrganizationCustomerInfo({ ...organizationCustomerInfo, accountType: e.target.value })}
              style={{ marginTop: '8px' }}
            >
              <FormControlLabel value="savings" control={<Radio />} label="Saving" />
              <FormControlLabel value="checking" control={<Radio />} label="Checking" />
            </RadioGroup>
          </form>
        )}

        <div className="button-container">
          <Button
            variant="contained"
            startIcon={<CancelIcon />}
            sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
            style={{ marginRight: '8px' }}
            onClick={handleCancel} // cancel the changes
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            endIcon={<AddCircleIcon />}
            sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
            onClick={handleAddCustomer} // save the changes
          >
            Add
          </Button>
        </div>
      </div>

      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        message={"Are you sure you want to add this customer?"}
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

export default AddCustomer;