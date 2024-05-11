import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, TextField, Button,MenuItem } from '@mui/material';
import axios from 'axios';

const UpdateIncDetails = () => {
  const { id } = useParams(); // Get the incident ID from URL params
  const [formData, setFormData] = useState({

    manager: '',
    workAround: '',
    businessImpact: '',
    bridgeDetails: '',
    priority: '',
    issueOwnedBy: '',
    nextUpdate: '',
    preUpdates: [],
    incNumber: '',
    account: '',
    status: '',
    date:'',
    time:''
  });

  useEffect(() => {
    console.log('is from list',id);
    const fetchIncidentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/incDetails/${id}`);
        if (response.status === 200) {
          const incidentData = response.data;
          // Set formData with fetched incident details
          setFormData({
            manager: incidentData?.[0]?.notifications.manager,
            workAround: incidentData?.[0]?.notifications.workAround,
            businessImpact: incidentData?.[0]?.notifications.businessImpact,
            bridgeDetails: incidentData?.[0]?.notifications.bridgeDetails,
            priority: incidentData?.[0]?.notifications.priority,
            issueOwnedBy: incidentData?.[0]?.notifications.issueOwnedBy,
            nextUpdate: incidentData?.[0]?.notifications.nextUpdate,
            preUpdates: incidentData?.[0]?.notifications.preUpdates,
            incNumber: incidentData?.[0]?.notifications.incNumber,
            account: incidentData?.[0]?.notifications.account,
            status: incidentData?.[0]?.notifications.status,
            date: incidentData?.[0]?.notifications.date,
            time: incidentData?.[0]?.time
          });
        } else {
          console.error('Failed to fetch incident details');
        }
      } catch (error) {
        console.error('Error occurred while fetching incident details:', error);
      }
    };

    fetchIncidentDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send formData to the server for updating incident details
      const currentDate = new Date();
      const formattedTime = currentDate.toLocaleString(); 
      const updatedPreStatusUpdate = [{ timestamp: formattedTime, message: formData.nextUpdate }, ...formData.preUpdates];

        // Update formData with the new preUpdates
     const updatedFormData = {
    ...formData,
    preUpdates: updatedPreStatusUpdate
  };

      const response = await axios.post(`http://localhost:8080/api/saveInc`, updatedFormData);
      if (response.status === 200) {
        console.log('Incident details updated successfully');
        // Redirect or display a success message
      } else {
        console.error('Failed to update incident details');
      }
    } catch (error) {
      console.error('Error occurred while updating incident details:', error);
    }
  };

  return (
    <Container maxWidth="md" className="incident-container">
    <Typography variant="h5" gutterBottom className="header">
      Please Update Incident Details
    </Typography>
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField name="incNumber" label="Inc Number" value={formData.incNumber} onChange={handleChange} fullWidth disabled />
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
            <MenuItem value="Three Ireland">Three Ireland</MenuItem>
            <MenuItem value="UK">UK</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField name="nextUpdate" label="Status Update/Next Step" value={formData.nextUpdate} onChange={handleChange} fullWidth multiline rows={1} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            select
            label="Add Status Update"
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Close">Close</MenuItem>
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
          <TextField name="preUpdates" label="Pre Status Details" 
          value={formData.preUpdates.map(update => `${update.timestamp} -- ${update.message}`).join("\n")}
          onChange={handleChange} fullWidth multiline rows={1} 
          InputProps={{
            readOnly: true, // Make the TextField read-only
          }}
          />
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

export default UpdateIncDetails;
