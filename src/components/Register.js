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
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('/auth/register', { email, password });
      console.log(response.data);
      setMessage(response.data.message)
      if (response.data.message == "User registered successfully") {
        const time = setTimeout(()=>{
          navigate("/")
          clearInterval(time)
        }, 3000)
      }
    } catch (err) {
      setMessage('Registration failed');
      navigate("/")
    }
  };

  return (
    <Container maxWidth="xs" component="main">
      <Paper elevation={6} sx={{ padding: 4, marginTop: 8, borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: 'secondary.main', mb: 2 }}>
            <PersonAddIcon />
          </Avatar>
          <Typography variant="h5" gutterBottom>
            Register
          </Typography>

          <Box component="form" onSubmit={(e)=> handleRegister(e)} noValidate sx={{ mt: 2 }}>
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
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {message && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {message}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e)=> handleRegister(e)}
            >
              Register
            </Button>
          </Box>
        </Box>
      </Paper>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button href="/login" variant="text" color="secondary">
            Already have an account? Login
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
