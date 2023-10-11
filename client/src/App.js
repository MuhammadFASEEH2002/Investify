import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Homepage from './resources/Homepage/Homepage';
import Userrole from './resources/Userrole/Userrole';
import Investorlogin from './resources/Investorlogin/Investorlogin';
import Investeelogin from './resources/Investeelogin/Investeelogin';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/login/user-role" element={<Userrole/>}/>
        <Route path="/login/investor-login" element={<Investorlogin/>}/>
        <Route path="/login/investee-login" element={<Investeelogin/>}/>
       
      </Routes>
    </Router>
    </>
  );
}

export default App;
