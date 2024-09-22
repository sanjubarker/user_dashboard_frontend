import React, { useState, useEffect } from 'react';
import { Switch, FormControlLabel } from '@mui/material';

const ThemeToggle = ({ toggleTheme }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const handleToggle = () => {
    setIsDarkMode((prevMode) => !prevMode);
    toggleTheme();
  };

  return (
    <FormControlLabel
      control={<Switch checked={isDarkMode} onChange={handleToggle} />}
      label={isDarkMode ? 'Dark Mode' : 'Light Mode'}
    />
  );
};

export default ThemeToggle;
