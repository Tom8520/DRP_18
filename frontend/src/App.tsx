import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL 
});

function App() {

  // const [testStuff, setTestStuff] = useState<String>("Not from backend");

  // useEffect(() => {
  //   client.get("/api").then(response => {
  //     setTestStuff(response.data);
  //     console.log(response.data);
  //   }).catch(error => {
  //     console.log("ERROR!")
  //     console.log(error);
  //   })
  // })

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}/>
    </Routes>
  </BrowserRouter>  
  );
}

export default App;
