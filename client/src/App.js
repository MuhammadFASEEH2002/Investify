import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Homepage from './resources/Homepage/Homepage';
import Userrole from './resources/Userrole/Userrole';


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        <Route path="/login/user-role" element={<Userrole/>}/>
       
      </Routes>
    </Router>
    </>
  );
}

export default App;
