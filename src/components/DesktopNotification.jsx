import React, { useEffect, useState } from 'react';

const DesktopNotification = ({ accountName }) => {
  const [incidentNumbersP1, setIncidentNumbersP1] = useState([]);
  const [incidentNumbersP2, setIncidentNumbersP2] = useState([]);

  useEffect(() => {
    // Function to fetch incident numbers for the specified account and priority
    const fetchIncidentNumbers = async (priority) => {
      try {
        const response = await fetch(`http://localhost:8080/api/listOfIncFromAccountAndPriority/${accountName}/${priority}`);
        if (response.ok) {
          const data = await response.json();
          // Extract incident numbers from the data
          if (priority === 'P1') {
            setIncidentNumbersP1(data.map(incident => incident.incNumber));
          } else if (priority === 'P2') {
            setIncidentNumbersP2(data.map(incident => incident.incNumber));
          }
        } else {
          console.error(`Failed to fetch incident numbers for priority ${priority}:`, response.statusText);
        }
      } catch (error) {
        console.error(`Error occurred while fetching incident numbers for priority ${priority}:`, error);
      }
    };

    // Fetch incident numbers initially
    fetchIncidentNumbers('P1');
    fetchIncidentNumbers('P2');

    // Schedule fetching incident numbers every 15 minutes for P1
    const intervalIdP1 = setInterval(() => fetchIncidentNumbers('P1'), 15 * 60 * 1000);

    // Schedule fetching incident numbers every 30 minutes for P2
    const intervalIdP2 = setInterval(() => fetchIncidentNumbers('P2'), 30 * 60 * 1000);

    // Clean up intervals on component unmount
    return () => {
      clearInterval(intervalIdP1);
      clearInterval(intervalIdP2);
    };
  }, [accountName]);

  useEffect(() => {
    // Function to show desktop notification with incident numbers
    const showNotification = (priority, incidentNumbers) => {
      // Check if the browser supports notifications
      if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
        return;
      }

      // Check if permission is granted
      if (Notification.permission === "granted") {
        // Construct notification message with incident numbers
        const notificationMessage = incidentNumbers.join('\n');

        // Show notification with incident numbers
        new Notification(`Open ${priority} Incidents for Account: ${accountName}`, { body: notificationMessage });
      } else if (Notification.permission !== "denied") {
        // Request permission
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            // Show notification with incident numbers
            showNotification(priority, incidentNumbers);
          }
        });
      }
    };

    // Show notifications when incident numbers change for P1
    if (incidentNumbersP1.length > 0) {
      showNotification('P1', incidentNumbersP1);
    }

    // Show notifications when incident numbers change for P2
    if (incidentNumbersP2.length > 0) {
      showNotification('P2', incidentNumbersP2);
    }
  }, [incidentNumbersP1, incidentNumbersP2, accountName]);

  return null; // This component doesn't render anything
};

export default DesktopNotification;
