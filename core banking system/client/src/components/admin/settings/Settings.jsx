
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Switch, FormControlLabel, Typography, Grid, Dialog, DialogActions, DialogContent, DialogTitle, Card } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PasswordIcon from '@mui/icons-material/Password';
import './Settings.css';
import api from '../../../services/api';
import Cookies from 'js-cookie';
import _ from 'lodash';

const userId = Cookies.get('userId');

const Settings = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    username: '',
    email: ''
  });
  const [initialInfo, setInitialInfo] = useState({ ...personalInfo }); // Store the initial user information

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setPersonalInfo({ ...initialInfo }); // Reset the form to the initial user information
  };

  const handleSave = async () => {
      // Check if the user has made any changes
      if (_.isEqual(personalInfo, initialInfo)) {
        console.log('No changes made');
        return;
      }
  

    try {
      const response = await api.put(`http://localhost:8800/staff_info/${userId}`, personalInfo);
      console.log('Personal Info updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating personal info:', error.response ? error.response.data : error.message);
    } finally {
      window.location.reload(); // Reload the page to reset the form
    }
  };

  const handlePasswordChange = async () => {
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);

    try {
        const response = await axios.put(`http://localhost:8800/change_password/${userId}`, { currentPassword, newPassword });
        console.log(response.data);
        // Handle success response
        alert('Password changed successfully');
    } catch (error) {
        console.error('Error changing password:', error);
        // Handle error response
        if (error.response && error.response.data) {
            alert(`Error: ${error.response.data.error}`);
        } else {
            alert('An error occurred while changing the password. Please try again.');
        }
    } finally {
        // Clear the text fields
        setCurrentPassword('');
        setNewPassword('');
        setOpen(false); // Close the dialog after the password is changed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`http://localhost:8800/staff_info/${userId}`);
        const data = response.data[0]; // Assuming the response is an array with a single object
        setPersonalInfo({
          username: data.username,
          email: data.email
        });
        setInitialInfo({
          username: data.username,
          email: data.email
        });
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []);

  console.log('Personal Info:', personalInfo);

  return (
    <div className='settings-container'>
      <Card sx={{ maxWidth: '600px', margin: 'auto', padding: '20px', borderRadius: 4, marginTop: '20px'}}>
        <Typography variant="h6">Personal Information</Typography>
        <form noValidate>
          <TextField
            label="Username"
            id="username"
            name="username"
            value={personalInfo.username}
            fullWidth
            margin="normal"
            onChange={(e) => setPersonalInfo({ ...personalInfo, username: e.target.value })}
          />

          <TextField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={personalInfo.email}
            fullWidth
            margin="normal"
            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            sx={{
              height: '56px', 
              '& input': { 
                height: '56px',
                fontSize: '16px'
                }
            }}
          />

          <div className="button-container">

          <Button
            variant="contained"
            startIcon={<PasswordIcon />}
            sx={{ backgroundColor: '#695CFE',display: 'flex', justifyContent: 'flex-start' ,':hover': { backgroundColor: '#5648CC' } }}
            style={{ marginRight: '8px' }}
            onClick={handleClickOpen}
          >
            Change Password
          </Button>

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
              startIcon={<SaveIcon />}
              sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
              onClick={handleSave} // save (update) the user information
            >
              Save
            </Button>
          </div>
        </form>
      </Card>

      {/* Dialog for changing password */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            margin="normal"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </DialogContent>

        <DialogActions>
            <Button 
                onClick={handleClose} 
                startIcon={<CancelIcon />}
                sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }} 
                variant="contained"
            >
                Cancel
            </Button>
            <Button 
                onClick={handlePasswordChange} 
                endIcon={<CheckCircleIcon  />}
                sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }} 
                variant="contained"
            >
                Submit
            </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
};

export default Settings;

