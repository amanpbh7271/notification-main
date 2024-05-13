import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import amodocs from './amdocs_2.png';
import '../styles/LoginForm.css';
import HeaderForLogin from './HeaderForLogin';

const Container = styled.div`
  background-color: #D3D3D3;
  background-size: cover;
  background-position: center;
  height: 100vh;
`;

function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiLoginData, setLoginApiData] = useState(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("apiLoginData" + apiLoginData);
    if (apiLoginData && apiLoginData.username === username && apiLoginData.password === password) {
      const userDetails = {
        username: username,
        mobnumber: mobileNumber,
      };
      sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
      navigate("/IncidentsList");
    } else {
      setErrorMessage("Please enter valid credentials");
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        if (username !== '') {
          const response = await fetch('http://localhost:8080/api/getUserDetails/' + username);
          const data = await response.json();
          setLoginApiData(data);
          console.log("user name " + data?.username);
          setMobileNumber(data?.mobile || '');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, [username]);

  return (
    <Container>
      <HeaderForLogin />
      <div className="login-form-container" style={{ marginTop: '100px' }}>
        <img src={amodocs} alt="Logo" className="login-logo" />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <div className="error-message" style={{ marginTop: '1em' }}>{errorMessage}</div>}
      </div>
      <footer> All rights are reserved by Amdocs</footer>
    </Container>
  );
}

export default LoginForm;
