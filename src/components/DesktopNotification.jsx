import React, { useEffect } from 'react';

const DesktopNotification = () => {
  useEffect(() => {
    // Function to show notification
    const showNotification = () => {
      // Check if the browser supports notifications
      if (!("Notification" in window)) {
        console.error("This browser does not support desktop notification");
        return;
      }

      // Check if permission is granted
      if (Notification.permission === "granted") {
        // Show notification
        new Notification("Hi!");
      } else if (Notification.permission !== "denied") {
        // Request permission
        Notification.requestPermission().then(permission => {
          if (permission === "granted") {
            // Show notification
            new Notification("Hi!");
          }
        });
      }
    };

    // Schedule notifications every 15 minutes
    const intervalId = setInterval(showNotification, 2 * 60 * 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return null; // This component doesn't render anything
};

export default DesktopNotification;
