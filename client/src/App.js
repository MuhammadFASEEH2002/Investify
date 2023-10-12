import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Homepage from './resources/Homepage/Homepage';
import Userrole from './resources/Userrole/Userrole';
import Userlogin from './resources/Userlogin/Userlogin';
import Userregistration from './resources/Userregistration/Userregistration';
// import Investorlogin from './resources/Investorlogin/Investorlogin';
// import Investeelogin from './resources/Investeelogin/Investeelogin';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/user-login" element={<Userlogin/>}/>
        <Route path="/user-registration/user-role" element={<Userrole/>}/> 
        <Route path="/user-registration" element={<Userregistration/>}/>    

      </Routes>
    </Router>
    </>
  );
}

export default App;
