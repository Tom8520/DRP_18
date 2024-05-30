import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import UploadImagePage from './pages/MainPage';

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
      <Route path="/main" element={<UploadImagePage />}/>
    </Routes>
  </BrowserRouter>  
  );
}

export default App;
