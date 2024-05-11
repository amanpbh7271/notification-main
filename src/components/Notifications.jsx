import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IncDetails from "./IncDetails.jsx";
import { Button } from 'react-bootstrap';
import IncidentForm from './IncidentForm.js';
import { useParams } from 'react-router-dom';
import axios from "axios";
import logout from './amdocs_2.png';

const Container = styled.div`
  background-image: url('amdocs_2.png');
  background-size: cover; /* or contain, depending on your preference */
`;


const Header = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
background: #36454f;
padding: 12px;
`;

const HeaderContent = styled.span`
color: white;
font-size: 18px;
vertical-align: middle;
margin-right: 5px
`;

const SearchAndContentWrp = styled.div`
  display: flex;
  
`;

const LeftContent = styled.div`
  height: 100%;
  width: 20%;
  margin: 0.5rem;
  padding: 0.5rem; /* Add padding */
  background-color: white;
  border-radius: 10px; /* Adjust the value to control the roundness */
`;

const RightContent = styled.div`

flex: 1 1 60%; 
display: flex;
  justify-content: center; /* Horizontally center the content */ 
  margin: 0.5rem; /* Add margin */
  padding: 0.5rem; /* Add padding */
`;

const ListOfInc = styled.div`
  overflow-y: scroll;
  height: 100%;
`;

const ParticularInc = styled.div`
  padding: 10px;
  background-color: #f0f0f0;
  margin: 10px;
  cursor: pointer;
  border: 5px outset #d1c1c1;
`;

const ItemName = styled.div``;

const ItemId = styled.div``;

const ItemPriority = styled.div``;

const SearchField = styled.input`
  width: 100%;
  padding: 4px;
`;


export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentInc, setCurrentInc] = useState(null);
  const [newInc,setNewInc] = useState(false);
  const [apiData, setApiData] = useState([]);




  const userData={
    userName:"Amar"
  }

  const IncDetailsData=[
    {
   IncNumber:112312,
   Account:"Three IreLand",
   Status:"Closed",
   IssueOwner:"Amdocs",
   ReportedDate:"20 feb 2024",
   ReportedTime:"15:30",
   IssueDescription:"this was genrted because ...",
   BusinessImpact:"this will effect ..",
   ImpactedApplication: "DSS, Tivoli",
   WorkAround:"Please kill job id",
   StatusUpdate:"...",
   NextUpdate:"15:30",
   priority:"p1",
   BridgeDeatils:"ww.joinbrifge",
   NotificationManager:"Bharti"
    },
    {
    IncNumber:112314,
    Account:"UK",
   Status:"Closed",
   IssueOwner:"Amdocs",
   ReportedDate:"20 feb 2024 15:30",
   ReportedTime:"",
   IssueDescription:"this was genrted because ...",
   BusinessImpact:"this will effect ..",
   ImpactedApplication: "DSS, Tivoli",
   WorkAround:"Please kill job id",
   StatusUpdate:"...",
   NextUpdate:"15:30",
   priority:"p1",
   BridgeDeatils:"ww.joinbrifge",
   NotificationManager:"Amar"
    },{
      IncNumber:112322,
     Account:"Three IreLand",
   Status:"open",
   IssueOwner:"Amdocs",
   ReportedDate:"20 feb 2024",
   ReportedTime:"15:30",
   IssueDescription:"this was genrted because ...",
   BusinessImpact:"this will effect ..",
   ImpactedApplication: "DSS, Tivoli",
   WorkAround:"Please kill job id",
   StatusUpdate:"...",
   NextUpdate:"15:30",
   priority:"p1",
   BridgeDeatils:"ww.joinbrifge",
   NotificationManager:"Sachin"
    },
    {
      IncNumber:112315,
     Account:"UK ",
   Status:"Open",
   IssueOwner:"Amdocs",
   ReportedDate:"20 feb 2024",
   ReportedTime:"15:30",
   IssueDescription:"this was genrted because ...",
   BusinessImpact:"this will effect ..",
   ImpactedApplication: "DSS, Tivoli",
   WorkAround:"Please kill job id",
   StatusUpdate:"...",
   NextUpdate:"15:30",
   priority:"p1",
   BridgeDeatils:"ww.joinbrifge",
   NotificationManager:"Amar"
    },
    {
    IncNumber:112112,
    Account:"Three IreLand and UK",
   Status:"Open",
   IssueOwner:"Amdocs",
   ReportedDate:"20 feb 2024",
   ReportedTime:"15:30",
   IssueDescription:"this was genrted because ...",
   BusinessImpact:"this will effect ..",
   ImpactedApplication: "DSS, Tivoli",
   WorkAround:"Please kill job id",
   StatusUpdate:"...",
   NextUpdate:"15:30",
   priority:"p1",
   BridgeDeatils:"ww.joinbrifge",
   NotificationManager:"Amar"
    }
  ]

  

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredResults = apiData.filter((item) =>
    item.notifications.incNumber.toString().includes(value)
    );
   // const filteredData = apiData.filter(item => item.notifications.incNumber === incId);
    setSearchResults(filteredResults);
  };

  const handleCurrentInc = (incId) => {
    
    if(newInc != false)
    setNewInc(!newInc);

    console.log('apidata in handlecurretn inc' +apiData);

    const filteredData = apiData.filter(
       (item) => item.notifications.incNumber === incId);
    setCurrentInc(filteredData);
    console.log('filteringCurrentInc '+ filteredData);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  const handleCloseInc = () => {
    if(newInc != false)
      setNewInc(!newInc);
    setCurrentInc(null);
  };

  function raiseNewInc (){
    if(currentInc!=null)
      setCurrentInc(null);
    setNewInc(!newInc);
    //navigate("/IncidentForm");
  }

  useEffect(() => {

    
    const storedUserDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const unsrnameforAPI = storedUserDetails.username;
    console.log(storedUserDetails);
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:8080/api/incDetailsForManager/'+unsrnameforAPI);
        //await fetch('http://localhost:8080/api/incDetailsForManager/John Doe')
        // /http://localhost:8080/api/logout/Sachin
       // const parsedData = JSON.parse(response);
        //const data = await response.json();
      

      const clonedResponse = response.clone(); // Clone the response
      const data = await clonedResponse.json();
      setApiData(data);

       return response.text();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  
    fetchData().then(data => {
     
      let fetchedData = data;

     // setApiData(data);
      console.log('Set APi data',apiData);
      console.log('API Data:', data);
     
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  
    const timer = setInterval(() => {
      // Filter the IncDetailsData based on conditions
      const filteredIncidents = apiData.filter((incident) => {
        return (
          incident.notifications.status === "Open" &&
          incident.notifications.manager === unsrnameforAPI
        );
      });

  

      // If there are matching incidents, show their IncNumbers in an alert
      
      let incNumbers =null;
      if (filteredIncidents.length > 0) {
         incNumbers = filteredIncidents
          .map((incident) => incident.notifications.incNumber)
          .join(", ");
      
      }
   
 
      if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification("these INC are in opened state  "+incNumbers);   
          }
        });
      } else {
        alert('Notifications not supported');
      }    
    }, 196 * 6 * 1000); // 1 minute in milliseconds

    return () => clearInterval(timer); // Cleanup function to clear the timer
  }, []); // Empty dependency array, effect runs only once

   

  return (
    <Container>
      <Header>
        <HeaderContent>Incident Blast</HeaderContent>
        <HeaderContent ><img src={logout}
       style={{ padding: '5px' ,height:'5vh'}}/></HeaderContent>
        <HeaderContent>Logout</HeaderContent>
      </Header>
      <SearchAndContentWrp>
        <LeftContent>
      
          <SearchField
  type="text"
  placeholder="Search by ID"
  value={searchTerm}
  onChange={handleSearch}
  style={{ marginBottom: "0.5rem" }} // Add margin-bottom to create a gap
/>

        <Button onClick={ raiseNewInc }>New INC</Button>
          <ListOfInc style={{ height: "500px", overflow: "auto" }}>
            {searchTerm === ""
              ? Array.isArray(apiData) && apiData.map((notification) => (
                  <ParticularInc
                    key={notification.notifications.incNumber}
                    onClick={() => handleCurrentInc(notification.notifications.incNumber)}
                  >
                    <ItemName>{notification.notifications.incNumber}</ItemName>
                    <ItemId>{notification.notifications.date}  {notification.notifications.time}</ItemId>
                    <ItemPriority>{notification.notifications.priority}</ItemPriority>
                  </ParticularInc>
                ))
              : Array.isArray(apiData) && searchResults.map((notification) => (
                  <ParticularInc
                    key={notification.notifications.incNumber}
                    onClick={() => handleCurrentInc(notification.notifications.incNumber)}
                  >
                    <ItemName>{notification.notifications.incNumber}</ItemName>
                    <ItemId>{notification.notifications.incNumber}</ItemId>
                    <ItemPriority>{notification.notifications.priority}</ItemPriority>
                  </ParticularInc>
                ))}
          </ListOfInc>
        </LeftContent>
        <RightContent>
          {currentInc && (
            <IncDetails data={currentInc} handleCloseInc={handleCloseInc} />
            
          )}
          {newInc && <IncidentForm raiseNewInc={ raiseNewInc}/>}
        
        </RightContent>
      </SearchAndContentWrp>
    </Container>
  );
}