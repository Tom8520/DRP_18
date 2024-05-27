import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL 
});

function App() {

  const [testStuff, setTestStuff] = useState<String>("Not from backend");

  useEffect(() => {
    client.get("/api").then(response => {
      setTestStuff(response.data);
      console.log(response.data);
    }).catch(error => {
      console.log("ERROR!")
      console.log(error);
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>Fetched from backend: {testStuff}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
