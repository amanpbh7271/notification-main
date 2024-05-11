import React from 'react';
import whatsAppQRCode from './WhatsAppQRCode.js'; // Assuming WhatsAppQRCode.js is in the same directory

const Whatsapp = () => {
    const phoneNumber = "7772980155"; // Replace with your WhatsApp phone number
    const data = "Hello, this is a test message!"; // Replace with your message or data
  
    return (
      <div>
        <h1>Scan QR Code to Send WhatsApp Message</h1>
        {/* Call the WhatsAppQRCode component with the phoneNumber and data props */}
        <whatsAppQRCode phoneNumber={phoneNumber} data={data} />
      </div>
    );
  };

export default Whatsapp;
