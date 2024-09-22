import React, { useState } from 'react';
import axios from '../utils/axiosConfig';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  Box,
  Avatar,
  useTheme,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      const token = response.data.token ? response.data.token : null;
      if (token) sessionStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs" component="main">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          marginTop: 8,
          borderRadius: 2,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              mb: 2,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 2 }}
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              sx={{
                input: { color: theme.palette.text.primary },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                style: { color: theme.palette.text.primary },
              }}
              sx={{
                input: { color: theme.palette.text.primary },
              }}
            />
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Paper>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button href="/register" variant="text" color="secondary">
            Don't have an account? Sign Up
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
