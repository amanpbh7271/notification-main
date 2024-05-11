import React, { useEffect } from 'react';

function DesktopNotification() {
  useEffect(() => {
    const showNotification = () => {
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('Hello, World please check ');
          }
        });
      } else {
        console.log('Notifications not supported');
      }
    };

    
    const timer = setTimeout(showNotification, 1 * 6 * 1000); // 10 minutes in milliseconds

    return () => clearTimeout(timer);
  }, []);

  return <h2>Desktop Notification</h2>;
}

export default DesktopNotification;
