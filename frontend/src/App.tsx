import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadImagePage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage';
import UserAccountPage from './pages/UserAccountPage';
import { setAuthToken } from './client/client';

function App() {

  const token = localStorage.getItem("token");
  if (token) {
    setAuthToken(token);
  }
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
      <Route path="/main" element={<UploadImagePage />}/>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<UserAccountPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>  
  );
}

export default App;
