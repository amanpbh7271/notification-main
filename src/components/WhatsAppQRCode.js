import React from "react";
import QRCode from "qrcode.react";

const WhatsAppQRCode = ({ phoneNumber, data }) => {
  // Function to generate WhatsApp message link
  const generateWhatsAppLink = () => {
    // Construct your WhatsApp message link with the phone number and data
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(data)}`;
  };

  // Generate WhatsApp link
  const whatsappLink = generateWhatsAppLink();

  return (
    <div>
      <h1>kkdasjldl</h1>
      {/* Link to open WhatsApp */}
      {/* <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
        Open WhatsApp
      </a> */}
      {/* QR Code for the WhatsApp link */}
      <QRCode value={whatsappLink} />
    </div>
  );
};

export default WhatsAppQRCode;
