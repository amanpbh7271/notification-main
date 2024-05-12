import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box } from '@mui/material';
import { Search as SearchIcon, AddCircleOutline as AddCircleOutlineIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import IncidentContainer from './IncidentContainer';

const Header = () => {
    const navigate = useNavigate();
    const handleSearch = () => {
    // Implement search functionality
    console.log('Search clicked');
  };

  const handleCreate = () => {
    // Implement create functionality
   // e.preventDefault();
    navigate("/IncidentContainer");
    console.log('Create clicked');
  };

  const handleLogout = () => {
    // Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Box sx={{ flex: '15%' }}>
          <Typography variant="h6" component="div">
            <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
          </Typography>
        </Box>
        
        {/* Incident Blast */}
        <Box sx={{ flex: '15%' }}>
          <Typography variant="h6">Incident Blast</Typography>
        </Box>



       {/* Search Inc and icon */}
       <Box sx={{ flex: '40%', display: 'flex', alignItems: 'center', position: 'relative', paddingRight: '40px' }}>
          <InputBase placeholder="Enter Inc Number" style={{ color: 'inherit', width: '100%' }} />
          <IconButton onClick={handleSearch} color="inherit" style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Create Inc */}
        <Box sx={{ flex: '15%' }}>
          <IconButton onClick={handleCreate} color="inherit">
            <AddCircleOutlineIcon />
          </IconButton>
        </Box>

        {/* Logout */}
        <Box sx={{ flex: '15%' }}>
          <IconButton onClick={handleLogout} color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
