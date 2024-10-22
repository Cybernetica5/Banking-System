import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

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

        Cookies.set('userId', response.data.userId, { secure: true, sameSite: 'Strict' });
        Cookies.set('email', email, { secure: true, sameSite: 'Strict' });
        Cookies.set('accessToken', response.data.accessToken, { secure: true, sameSite: 'Strict' });
        Cookies.set('refreshToken', response.data.refreshToken, { secure: true, sameSite: 'Strict' });
        Cookies.set('customerId', response.data.customerId, { secure: true, sameSite: 'Strict' });
        
        console.log('Cookies:', Cookies.get());
        console.log('Local Storage:', localStorage.getItem('user'));
        console.log('Navigatning to dashboard');
        
        navigate('/dashboard');
      } else {
        setError(response.data.error || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {error && (
            <Typography color="error" align="center">
              {error}
            </Typography>
          )}
          <Link href="/signup" variant="body2" sx={{ mt: 2 }}>
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default UserLogin;