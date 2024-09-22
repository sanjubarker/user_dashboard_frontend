import React, { useEffect, useState } from 'react';
import axios from '../utils/axiosConfig';
import {
  Container,
  Typography,
  TextField,
  Button,
  Avatar,
  Box,
  Snackbar,
  Divider,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: '',
    profilePicture: null,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/profile/me');
        setProfile(response.data._doc);
        setPreview(response.data.profilePicture);
      } catch (error) {
        console.error('Error fetching profile:', error);
        if (error.status === 401)
          setMessage('Your login session has expired, Please try login again.');
        else setMessage('Failed to fetch profile details.');
        setOpenSnackbar(true);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('bio', profile.bio);
    if (file) {
      formData.append('profilePicture', file);
    }

    try {
      const response = await axios.put(
        'http://localhost:4000/profile/update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setMessage('Profile updated successfully!');
      setProfile(response.data);
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile.');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container
      sx={{
        maxWidth: 600,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.default,
        padding: 4,
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
        <Avatar
          src={preview || profile.profilePicture}
          alt="Profile"
          sx={{
            width: 120,
            height: 120,
            border: `2px solid ${theme.palette.primary.main}`,
            mb: 2,
          }}
        />
        <Button variant="contained" component="label">
          Change Profile Picture
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            label="Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            sx={{
              input: { color: theme.palette.text.primary },
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            sx={{
              input: { color: theme.palette.text.primary },
            }}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Bio"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            InputLabelProps={{
              style: { color: theme.palette.text.primary },
            }}
            sx={{
              input: { color: theme.palette.text.primary },
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Update Profile
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              navigate('/dashboard');
            }}
            fullWidth
          >
            Return to Dashboard
          </Button>
        </Box>
      </form>
      <Divider sx={{ my: 4 }} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={message}
      />
    </Container>
  );
};

export default Profile;
