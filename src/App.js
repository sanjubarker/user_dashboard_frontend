import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './utils/theme';
import ThemeToggle from './components/ThemeToggle'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    setIsDarkMode(savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
  };

  const selectedTheme = useMemo(() => (isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <Router>
        <div style={{ padding: '1rem' }}>
          <ThemeToggle toggleTheme={toggleTheme} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
