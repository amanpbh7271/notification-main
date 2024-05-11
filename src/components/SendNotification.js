import React, { useEffect } from 'react';

const Notification = ({ message }) => {
    useEffect(() => {
      // Set interval for 1 minute
      const interval = setInterval(() => {
        // Display the notification every 1 minute
        alert(message);
      }, 1 * 60 * 1000);
  
      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }, [message]); // Include 'message' in the dependency array to prevent memory leaks
  
    return null; // Notification component doesn't render anything in the DOM
  };

function SendNotification() {

    return (
        <div>
          <h1>React Notification Demo</h1>
          <Notification message="Your notification message here" />
        </div>
      );
}

export default SendNotification;