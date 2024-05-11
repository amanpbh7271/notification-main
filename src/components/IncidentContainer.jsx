import React, { useState } from 'react';
import { Container, Typography, Grid, TextField, MenuItem, Button } from '@mui/material';
import '../styles/IncidentContainer.css';

const IncidentContainer = () => {
  const [formData, setFormData] = useState({
    incNumber: '',
    account: '',
    status: '',
    addStatusUpdate: '',
    businessImpact: '',
    workaround: '',
    manager: '',
    issueOwnedBy: '',
    bridgeDetails: '',
    priority: ''
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
     
    // Get current date and time
    const currentDate = new Date();
    const currentDateFormatted = currentDate.toISOString().split('T')[0]; // Extract date part
    const currentTimeFormatted = currentDate.toLocaleTimeString(); // Extract time part
    
    // Create pre-updates object
    const preUpdates = [
      {
        timestamp: `${currentDateFormatted} ${currentTimeFormatted}`,
        message: formData.status // Assuming statusUpdate is the message
      }
    ];

    // Include pre-updates along with other form data
    const formDataWithDateTimeAndPreUpdates = {
      ...formData,
      date: currentDateFormatted, // Add current date
      time: currentTimeFormatted, // Add current time
      preUpdates: preUpdates, // Add pre-updates
      nextUpdate: formData.status 
    };


    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/saveInc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataWithDateTimeAndPreUpdates)
      });
      if (response.ok) {
        console.log('Incident data saved successfully');
        // Reset form after successful submission if needed
        setFormData({
          incNumber: '',
          account: '',
          status: '',
          addStatusUpdate: '',
          businessImpact: '',
          workAround: '',
          manager: '',
          issueOwnedBy: '',
          bridgeDetails: '',
          priority: ''
        });
      } else {
        console.error('Failed to save incident data');
      }
    } catch (error) {
      console.error('Error occurred while saving incident data:', error);
    }
  };

  return (
    <Container maxWidth="md" className="incident-container">
      <Typography variant="h5" gutterBottom className="header">
        Please Enter Incident Details
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField name="incNumber" label="Inc Number" value={formData.incNumber} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Account"
              name="account"
              value={formData.account}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Ireland">Ireland</MenuItem>
              <MenuItem value="UK">UK</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField name="status" label="Status Update/Next Step" value={formData.status} onChange={handleChange} fullWidth multiline rows={1} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Add Status Update"
              name="addStatusUpdate"
              value={formData.addStatusUpdate}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Open">Open</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="P1">P1</MenuItem>
              <MenuItem value="P2">P2</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Notification Manager"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Sachin">Sachin</MenuItem>
              <MenuItem value="Bharti">Bharti</MenuItem>
              <MenuItem value="Amar">Amar</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Issue Owned By"
              name="issueOwnedBy"
              value={formData.issueOwnedBy}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="Amdocs">Amdocs</MenuItem>
              <MenuItem value="TechM">TechM</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField name="businessImpact" label="Business Impact" value={formData.businessImpact} onChange={handleChange} fullWidth multiline rows={1} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="workAround" label="workAround" value={formData.workAround} onChange={handleChange} fullWidth multiline rows={2} />
          </Grid>
          <Grid item xs={12}>
            <TextField name="bridgeDetails" label="Bridge Details" value={formData.bridgeDetails} onChange={handleChange} fullWidth multiline rows={1} />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default IncidentContainer;
