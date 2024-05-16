import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm.js';
import IncidentContainer from './components/IncidentContainer.jsx';
import UpdateIncDetails from './components/UpdateIncDetails.jsx';
import IncidentsList from './components/IncidentsList.jsx';
import DesktopNotification from './components/DesktopNotification.jsx'; // Import the DesktopNotification component
import { isLoggedIn } from './utils/auth'; // Import your authentication function



function App() {
  const isAuthenticated = isLoggedIn(); // Determine if the user is authenticated
 const accountName ="Three Ireland";
 
  return (
      <div className="App">

        <BrowserRouter>
        {/* <DesktopNotification accountName={accountName} /> */}
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/IncidentContainer" element={<IncidentContainer />} />
            <Route path="/UpdateIncDetails/:id" element={<UpdateIncDetails />} />
            <Route
            path="/IncidentsList" // Update path to match the component
            element={isAuthenticated ? <IncidentsList/> : <Navigate to="/" />}
          />
            
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
