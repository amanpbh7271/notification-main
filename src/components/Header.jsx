// Header.jsx
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, alpha } from '@mui/material';
import { Search as SearchIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material'; 

const Header = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleLogout = () => {
    // Implement logout logic here
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Implement search logic here using searchText
    console.log("Searching for:", searchText);
    // Redirect to Incidents page with search query
    window.location.href = `/IncidentsList?search=${searchText}`;
  };

  return (
    <AppBar position="static"  sx={{ backgroundColor: '#607d8b' }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" style={{ flex: '0 0 25%', textAlign: 'left' }}>
          Your Logo
        </Typography>

        {/* Title */}
        <Typography variant="h6" component="div" style={{ flex: '0 0 25%', textAlign: 'center' }}>
          Incident Blast
        </Typography>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} style={{ flex: '0 0 25%', display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="Search incidents..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchText}
            onChange={handleSearchChange}
            sx={{
              ml: 1,
              width: '100%',
              color: 'inherit',
              '&::placeholder': {
                color: 'inherit',
              },
              border: '1px solid',
              borderColor: alpha('#000', 0.5),
              borderRadius: 1,
              px: 1.5,
              py: 1,
              '&:focus': {
                outline: 'none',
                borderColor: '#000',
              },
              // Add z-index to ensure text is visible
              zIndex: 1,
            }}
          />
          <IconButton type="submit" aria-label="search" sx={{ zIndex: 2 }}>
            <SearchIcon />
          </IconButton>
        </form>

        {/* Logout Button */}
        <IconButton color="inherit" onClick={handleLogout} style={{ flex: '0 0 25%', textAlign: 'right' }}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
