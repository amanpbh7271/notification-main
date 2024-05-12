import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IncidentForm from './components/IncidentForm.js';
import LoginForm from './components/LoginForm.js';
import SendNotification from './components/SendNotification.js';
import Notifications from './components/Notifications.jsx';
import IncidentContainer from './components/IncidentContainer.jsx';
import UpdateIncDetails from './components/UpdateIncDetails.jsx';
import IncidentsList from './components/IncidentsList.jsx';
import DesktopNotification from './components/DesktopNotification.jsx'; // Import the DesktopNotification component



  
   


  

function App() {
  return (
      <div className="App">
        <BrowserRouter>
        <DesktopNotification /> {/* Include the DesktopNotification component here */}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/IncidentForm" element={<IncidentForm />} />
            <Route path="/SendNotification" element={<SendNotification />} />
            <Route path="/Notifications" element={<Notifications />} />
            <Route path="/IncidentContainer" element={<IncidentContainer />} />
            <Route path="/UpdateIncDetails/:id" element={<UpdateIncDetails />} />
            <Route path="/IncidentsList" element={<IncidentsList />} /> {/* No need to pass theme here */}
            
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
