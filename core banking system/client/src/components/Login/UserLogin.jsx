import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        console.log('Response: ', response);
        // Store the user information in cookies
        localStorage.setItem('user', JSON.stringify(response.data));

        if (response.data.role === 'customer') {
          localStorage.setItem('customerId', response.data.customerId);
          Cookies.set('userId', response.data.userId, { secure: true, sameSite: 'Strict' });
          Cookies.set('email', email, { secure: true, sameSite: 'Strict' });
          Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'Strict' });
          Cookies.set('refreshToken', response.data.refreshToken, { secure: true, sameSite: 'Strict' });
          Cookies.set('customerId', response.data.customerId, { secure: true, sameSite: 'Strict' });
          
          console.log('Cookies:', Cookies.get());
          console.log('Local Storage:', localStorage.getItem('user'));
          console.log('Navigatning to dashboard');
          
          navigate('/dashboard');

        }else if (response.data.role === 'manager' || response.data.role === 'employee') {

        Cookies.set('userId', response.data.userId, { secure: true, sameSite: 'Strict' });
        Cookies.set('email', email, { secure: true, sameSite: 'Strict' });
        Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'Strict' });
        Cookies.set('refreshToken', response.data.refreshToken, { secure: true, sameSite: 'Strict' });
        Cookies.set('staffId', response.data.staff_id, { secure: true, sameSite: 'Strict' });
        Cookies.set('role', response.data.role, { secure: true, sameSite: 'Strict' });

        console.log('Cookies:', Cookies.get());
        console.log('Local Storage:', localStorage.getItem('user'));
        console.log('Navigatning to dashboard');
        
        navigate('/admin-dashboard');

        }
      } else {
        setError(response.data.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Error:', err);
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
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
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
              Sign In
            </Button>
          </Box>

          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Box>

        </Box>
      </Box>
    </Container>
  );
};


export default UserLogin;