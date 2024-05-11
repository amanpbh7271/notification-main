import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, Button, TextField } from '@mui/material';
import Header from './Header'; // Import the Header component

const IncidentsList = () => {
  const [incidents, setIncidents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch incidents data
    const fetchData = async () => {
      try {
        const unsrnameforAPI = 'Sachin'; // Provide your username here
        const response = await fetch(`http://localhost:8080/api/incDetailsForManager/${unsrnameforAPI}`);
        if (response.ok) {
          const data = await response.json();
          setIncidents(data);
        } else {
          console.error('Failed to fetch incident details:', response.statusText);
        }
      } catch (error) {
        console.error('Error occurred while fetching incident details:', error);
      }
    };
    fetchData();
  }, []);

  // Paginate to a specific page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Go to a specific page
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Determine total number of pages
  const itemsPerPage = 10;
  const totalPages = Math.ceil(incidents.length / itemsPerPage);

  // Get incidents for current page
  const indexOfLastIncident = currentPage * itemsPerPage;
  const indexOfFirstIncident = indexOfLastIncident - itemsPerPage;
  const currentIncidents = incidents.slice(indexOfFirstIncident, indexOfLastIncident);

  return (
    <div>
      <Header />
      <Container maxWidth="md" style={{ marginTop: '40px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: '#607d8b', color: '#fff' }}>
              <TableRow>
                <TableCell>Incident Number</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Last Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentIncidents.map((incident, index) => (
                <TableRow key={incident.notifications.incNumber} component={Link} to={`/UpdateIncDetails/${incident.notifications.incNumber}`} style={{ textDecoration: 'none', color: 'inherit', backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#e0e0e0' }}>
                  <TableCell>{incident.notifications.incNumber}</TableCell>
                  <TableCell>{incident.notifications.account}</TableCell>
                  <TableCell>{incident.notifications.priority}</TableCell>
                  <TableCell>{incident.notifications.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Pagination */}
        <div style={{ marginTop: '20px', textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>Previous</Button>
          <Button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>Next</Button>
          <TextField
            type="number"
            value={currentPage} // Display current page number
            onChange={(e) => goToPage(parseInt(e.target.value))}
            inputProps={{ min: 1, max: totalPages }}
            style={{ marginLeft: '10px', marginRight: '40px', width: '100px' }} // Increased width
          />
          <Button onClick={() => goToPage(parseInt(currentPage))}>Go</Button>
        </div>
      </Container>
    </div>
  );
};

export default IncidentsList;
