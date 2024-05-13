import React , { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Box,Tooltip } from '@mui/material';
import { Search as SearchIcon, AddCircleOutline as AddCircleOutlineIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import IncidentContainer from './IncidentContainer';
import LOGO from './amdocs_2.png';

const Header = () => {
    const navigate = useNavigate();

    const [incidentNumber, setIncidentNumber] = useState("");

    const handleSearch = () => {
    // Implement search functionality
     // Implement search functionality
        // Assuming you have the incident number stored in a variable called 'incidentNumber'
        //const incidentNumber = "1212321INCS"; // Replace this with the actual incident number or get it from the input field
        // Call API to get incident details using incident number
        // After getting the incident details, navigate to the update incident page with the incident number
        navigate(`/UpdateIncDetails/${incidentNumber}`);
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
                        <img src={LOGO} alt="Logo" style={{ height: '40px', width: 'auto' }} />
                    </Typography>
                </Box>
        
        {/* Incident Blast */}
        <Box sx={{ flex: '50%' }}>
          <Typography variant="h5">Incident Blast</Typography>
        </Box>

{/* Search Inc and icon */}
{/* Search Inc and icon */}
<Box sx={{ flex: '15%', display: 'flex', alignItems: 'center', position: 'relative', paddingRight: '16px' }}>
  {/* Input field for Enter Inc Number */}
  <Box sx={{ flex: '1', paddingRight: '8px' }}>
    <InputBase placeholder="Enter Inc Number" style={{ color: 'inherit', width: '100%' }} 
    value={incidentNumber}
    onChange={(e) => setIncidentNumber(e.target.value)}
    />
  </Box>
  {/* Search icon */}
  <Box>
  <Tooltip title="Search Inc">
    <IconButton onClick={handleSearch} color="inherit">
      <SearchIcon />
    </IconButton>
    </Tooltip>
  </Box>
</Box>

 {/* Create Inc */}
 <Box sx={{ flex: '5%' }}>
                    <Tooltip title="Raise INC">
                        <IconButton onClick={handleCreate} color="inherit">
                            <AddCircleOutlineIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

 {/* Logout */}
 <Box sx={{ flex: '5%' }}>
                    <Tooltip title="Logout">
                        <IconButton onClick={handleLogout} color="inherit">
                            <ExitToAppIcon />
                        </IconButton>
                    </Tooltip>
                </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
