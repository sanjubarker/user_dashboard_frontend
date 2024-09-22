import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  AppBar,
  Toolbar,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axiosConfig';

const Dashboard = () => {
  const [lastLogin, setLastLogin] = useState();
  const navigate = useNavigate();
  const theme = useTheme();
  
  useEffect(() => {
    getAndSetLoginTime();
  }, []);

  const getAndSetLoginTime = async () => {
    try {
      const res = await axios.get('/profile/me');
      const userDetails = res.data._doc ? res.data._doc : '';
      const time = userDetails.lastLogin ? userDetails.lastLogin : '';

      setLastLogin(new Date(time).toLocaleString() || '');
    } catch (error) {
      if (error.code === 1100) alert('User not authenticated');
      else alert('Something went wrong...');
    }
  };

  const activityFeed = [
    'Logged in',
    'Updated profile',
    'Added a new friend',
    'Posted an update',
  ];

  const friendsList = ['John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown'];

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    window.location.href = '/login';
    console.log('User logged out');
  };

  const goToProfile = () => {
    navigate('/profile');
  };

  return (
    <Container maxWidth="lg" sx={{ padding: '2rem', backgroundColor: theme.palette.background.default }}>
      <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.text.primary }}>
        Welcome Back, User!
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ color: theme.palette.text.secondary }}>
        Last Login: {lastLogin}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={goToProfile}
        sx={{ marginBottom: '1rem' }}
      >
        Go to Profile
      </Button>

      <Grid container spacing={3}>
        {/* Activity Feed */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Activity Feed
              </Typography>
              <List>
                {activityFeed.map((activity, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={activity} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card
            sx={{
              backgroundColor: theme.palette.background.paper,
              color: theme.palette.text.primary,
            }}
          >
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Friends
              </Typography>
              <List>
                {friendsList.map((friend, index) => (
                  <div key={index}>
                    <ListItem>
                      <ListItemText primary={friend} />
                    </ListItem>
                    {index < friendsList.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
