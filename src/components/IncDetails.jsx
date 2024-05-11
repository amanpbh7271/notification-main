import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Form, Row, Col } from 'react-bootstrap';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import axios from "axios";
import QRCode from "qrcode.react";
import CopyButton from "./CopyCode";

const Container = styled.div`
    color: black;
    margin: 20px auto;
    padding: 20px;
    width: 100%;
    max-width: 10000px;
    background-color: #faf9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const CrossIcon = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Header = styled.div`
width: 100%;
background-color: #007bff;
display: flex;
justify-content: space-between;
border-radius: 10px; /* Adjust the value to control the roundness */
padding: 12px;
margin-bottom: 10px;
`;

const HeaderContent = styled.span`
color: white;
font-size: 18px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;

  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background: linear-gradient(90deg, #FFC30A 0.05%, #F66549 48.49%, #EC008C 100.06%);
  /* &:hover {
     background-color: #218838; /* Darker shade of green on hover */
   }  */
`;

export default function IncDetails({ data, handleCloseInc }) {
  //   {data.map((item) => (
  console.log('data in indetails '+data);

  const [incNumber, setIncNumber] = useState(""); // Initialize with current inc
  const [account, setAccount] = useState(""); // Initialize with current address
  const [preStatusUpdate, setPreStatusUpdate] = useState([]);
 // const [preupdates, setPreupdates] = useState([]);
  const [statusupdate, setStatusupdate] = useState(""); // Initialize with current mobile number
  const [reportedDate,setReportedDate] = useState('');
  const [bridgeDeatils,setBridgeDeatils] =useState("");
  const [businessImpact,setBusinessImpact] = useState("");
  const [workAround,setWorkAround] = useState("");
  const [notificationManager,setNotificationManager] =useState("");
  const [status,setStatus] =useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const formattedDate = currentDateTime.toLocaleDateString(); // Get formatted date
  const formattedTime = currentDateTime.toLocaleTimeString(); // Get formatted time
  const [priority,setPriority] = useState("");
  const [issueOwnedBy,setIssueOwnedBy] =useState("");
  const [phoneNumber,setPhoneNumber] = useState(""); //8527289988 +353872484431Replace with your WhatsApp phone number
  const [incForm, SetIncForm] = useState(true);
  const [whatsappForUpdate, SetwhatsappUpdate] = useState(false);
  
  const dataforWhatsapp = ("*Below are Details for raised INC*" + "\n" + "*IncNumber*:- " + incNumber +"\n*Account* :-"+account +
  "\n*Updated/next Status*:-\n" + preStatusUpdate.map(update => `${update.timestamp} -- ${update.message}`).join("\n") +
  "\n*Status*:-" + status +
  "\n*Business impact*:-"+businessImpact + "\n*Work Around*:-"+workAround +
  "\n*Notification Manager*:-"+ notificationManager+"\n*Issue Owned By*:-"+issueOwnedBy+
  "\n"+"*bridgeDeatils*:-" + bridgeDeatils+"\n*Date*:-"+ formattedDate+"\n*Time*:-"+ formattedTime+
  "\n*priority*:-"+priority
); // Replace with your message or data
 
  

  useEffect(() => {
   
      const storedUserDetails = JSON.parse(sessionStorage.getItem('userDetails'));
      setPhoneNumber(storedUserDetails.mobnumber);
    //  alert(storedUserDetails.mobnumber);
    
    
    if (data) {
      console.log("data in incDetails"+data);
      setIncNumber(data?.[0]?.notifications.incNumber||'');
      setBridgeDeatils(data?.[0]?.notifications.bridgeDetails||'');
      setAccount(data?.[0]?.notifications.account|'');
      setStatusupdate(data?.[0]?.notifications.nextUpdate||'');
      setReportedDate(data?.[0]?.ReportedDate||'');
      setPreStatusUpdate(data?.[0]?.notifications.preUpdates || []);
      setBusinessImpact(data?.[0]?.notifications.businessImpact ||'');
      setWorkAround(data?.[0]?.notifications.workAround||'');
      setNotificationManager(data?.[0]?.notifications.manager||'');
      setStatus(data?.[0]?.notifications.status||'');
      setPriority(data?.[0]?.notifications.priority||'');
      setIssueOwnedBy(data?.[0]?.notifications.issueOwnedBy|'');
      console.log("presupdatestus"+preStatusUpdate);
    }
  }, [data]);



 
  const handlePriorty = (e) =>{
    setPriority(e.target.value);
  }
  const HandleIssueOwnedBy = (e) => {

    setIssueOwnedBy(e.target.value);
  };
  const handleAccountChange = (e) => setAccount(e.target.value);
  const handleStatusupdate = (e) => setStatusupdate(e.target.value);
  const handleBridgeDeatils = (e) => setBridgeDeatils(e.target.value);
  const handleBusinessImpact = (e) => setBusinessImpact(e.target.value);
  const handleWorkAround = (e)=> setWorkAround(e.target.value);
  const handleStatus = (e)=> setStatus(e.target.value);
  const hadnlenotificationManager = (e) => setNotificationManager(e.target.value);
  const handleSetPreStatusUpdate =(e) => setPreStatusUpdate(e.target.value);

  // Event handlers for input changes
  //const handleNameChange = (e) => setName(e.target.value);
  // const handleAddressChange = (e) => setAccount(e.target.value);
  // const handleMobileChange = (e) => setStatusupdate(e.target.value);
 


  const handleSubmit = (e) => {
   // const updatedStatus = statusupdate + "/n" + preStatusUpdate; 

    console.log("value for preStatusUpdate"+preStatusUpdate);
   // const updatedPreStatusUpdate = [...preStatusUpdate, { timestamp: formattedTime, message: statusupdate }];
    const updatedPreStatusUpdate = [{ timestamp: formattedTime, message: statusupdate }, ...preStatusUpdate];

    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:8080/api/saveInc',
      data: {
        "incNumber": incNumber,
        "account": account,
        "status":status,
        "businessImpact":businessImpact,
        "workAround":workAround,
        "manager": notificationManager,
        "issueOwnedBy": issueOwnedBy,
        "bridgeDetails": bridgeDeatils,
        "priority": priority,
        "date": formattedDate,
        "time": formattedTime,
        "preUpdates":updatedPreStatusUpdate,
        "nextUpdate":statusupdate
        
      }
    })
    .then((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });

     // Update state with the new preStatusUpdate array

    //  const reversedPreStatusUpdate = [...updatedPreStatusUpdate].reverse();
    // setPreStatusUpdate(reversedPreStatusUpdate);

    setPreStatusUpdate(updatedPreStatusUpdate);
    SetIncForm(!incForm);
    SetwhatsappUpdate(!whatsappForUpdate);
    
  };

    // Function to generate WhatsApp message link
    const generateWhatsAppLink = () => {
      // Construct your WhatsApp message link with the phone number and data
      return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(dataforWhatsapp)}`;
    };
  
    const whatsappLink = generateWhatsAppLink();

  return (
    <Container className="container mt-3" >
      
      {incForm && (<div>
        <Header>
        <HeaderContent>Please Update Incident Details</HeaderContent>
        <CrossIcon onClick={handleCloseInc}>X</CrossIcon>
        </Header>
      <Form style={{ marginTop: '20px'}} onSubmit={handleSubmit}>
     
          <Row className="mb-3">
          <Col>
            <Form.Label>Inc Number</Form.Label>
            <Form.Control type="text" value={incNumber} 
            readOnly
            />
          </Col>
          <Col>
            <Form.Label>Account</Form.Label>
            <Form.Select  value={account} onChange={handleAccountChange}>
              <option value="" disabled>please select</option>
              <option value="Three Ireland">Three Ireland</option>
                <option value="UK">UK</option>
            </Form.Select>
          </Col>

        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Status Upadate/Next Step</Form.Label>
            <Form.Control type="text" value={statusupdate} onChange={handleStatusupdate}
            style={{ height: "50px", fontSize: "1.0rem" }}
            />
          </Col>
          <Col>
            <Form.Label>Add Status Update</Form.Label>
            <Form.Select type="text" 
            custom value={status}
            onChange={handleStatus}>
              <option value="" disabled>Please select</option>
              <option value="Open">Open</option>
              <option value="Close">Close</option>
            
             </Form.Select>
            

          </Col>

        </Row>


        <Row className="mb-3">
          <Col>
            <Form.Label>Business Impact</Form.Label>
            <Form.Control type="text" value={businessImpact} onChange={handleBusinessImpact}
            style={{ height: "50px", fontSize: "1.0rem" }}
            />
          </Col>
          <Col>
            <Form.Label>Work around</Form.Label>
            <Form.Control as="textarea" type="text" 
  
               value={workAround}
                onChange={handleWorkAround}
               
                  style={{ height: "50px", fontSize: "1.0rem" }}
              />
            
         
          </Col>

        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Notification Manager</Form.Label>
            <Form.Select  value={notificationManager} onChange={hadnlenotificationManager}>
              <option value="" disabled>please select</option>
              <option value="Bharti">Bharti</option>
              <option value="Amar">Amar</option>
              <option value="Sachin">Sachin</option>
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Issue Owned By</Form.Label>
            <Form.Select custom
             value={issueOwnedBy}
             onChange={HandleIssueOwnedBy}
            >
              <option value="" disabled>Please select</option>
              <option value="Amdocs">Amdocs</option>
              <option value="TechM">TechM</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
          <Form.Label>Bridge details</Form.Label>
          <Form.Control type="text" value={bridgeDeatils} onChange={handleBridgeDeatils}
          style={{ height: "50px", fontSize: "1.0rem" }}
          />
          </Col>
          <Col>
            
            <Form.Label>Priority</Form.Label>
              <Form.Select custom
               value={priority}
               onChange={handlePriorty}
              >
                <option value="" disabled>Please select</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </Form.Select>
          </Col>
          </Row>
          <Row>
           <Col>
              <Form.Label>Pre Status Details</Form.Label>
              <textarea
                rows={4} // Set the number of visible text lines
                cols={50} // Set the number of visible text columns
                value={preStatusUpdate.map(update => `${update.timestamp} -- ${update.message}`).join("\n")}
                readOnly // Make the textarea readonly to prevent editing
    />
           </Col>
          </Row>
          <Row className="mb-3">
  <Col></Col> {/* Empty column to offset */}
  <Col xs={3}> {/* Col with width set to 6 out of 12 */}
    <StyledButton variant="Success" type="submit" className="w-100">Update Details</StyledButton>
  </Col>
  <Col></Col> {/* Empty column to offset */}
</Row>
      </Form>
     
    </div>)}
      
    { whatsappForUpdate && (
        <div>
          <Header>
        <HeaderContent>Scan QR Code to Send WhatsApp Message</HeaderContent>
        <CrossIcon onClick={handleCloseInc}>X</CrossIcon>
        </Header>
          {/* Call the WhatsAppQRCode component with the phoneNumber and data props */}
          <QRCode value={whatsappLink}  style={{ marginTop: '20px' }}/>
           

          <Header>
        <HeaderContent>Below are submited details</HeaderContent>
        <CopyButton code={dataforWhatsapp} />        
        </Header>

          <table style={{ borderCollapse: 'collapse', border: '1px solid black',margin: 'auto' }} >
          <tbody>
            
            <tr>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"Inc Number"}:</strong> {incNumber}
              </td>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"Account"}:</strong> {account}
              </td>
            </tr>
            
            <tr>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"Next Update"}:</strong> {statusupdate}
              </td>
              <td  colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"status"}:</strong> {status}
              </td>
            </tr>
            
            <tr>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"businessImpact"}:</strong> {businessImpact}
              </td>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"workAround"}:</strong> {workAround}
              </td>
            </tr>
            
            <tr>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"manager"}:</strong> {notificationManager}
              </td>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"issueOwnedBy"}:</strong> {issueOwnedBy}
              </td>
            </tr>
           
            <tr>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"bridgeDetails"}:</strong> {bridgeDeatils}
              </td>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"priority"}:</strong> {priority}
              </td>
            </tr>
           
            <tr>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"date"}:</strong> {formattedDate}
              </td>
              <td colSpan="2" style={{ border: '1px solid black', padding: '8px', textAlign: 'center' }}>
                <strong>{"Time"}:</strong> {formattedTime}
              </td>
            </tr>
          </tbody>
        </table>
        </div>)
      }

    </Container>
  );
}