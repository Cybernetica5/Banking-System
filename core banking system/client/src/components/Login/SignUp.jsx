import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { register } from '../../services/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [account_number, setAccountNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(account_number, username, email, password);
      console.log('Response: ',response);
      console.log('Response Data: ',response.data);
      if (response.status === 201) {
        // Redirect to login page or dashboard after successful registration
        navigate('/login');
      } else {
        setError(response.data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', minHeight: '100vh', alignItems: 'center'}}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
        }}
      >

        <AccountCircleIcon sx={{ fontSize: 60, color: '#695CFE' }} />

        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="account_number"
            label="Account Number"
            name="account_number"
            autoComplete="account_number"
            autoFocus
            value={account_number}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password (min. 6 characters)"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#695CFE', ':hover': { backgroundColor: '#5648CC' } }}
            >
              Sign Up
            </Button>
          </Box>

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Link href="/login" variant="body2">
          {"Already have an account? Login"}
          </Link>
        </Box>  

      </Box>
    </Box>
    </Container>
  );
};

export default SignUp;