import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Homepage from './resources/homepage/homepage'


function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route exact path="/" element={<Homepage/>} />
        {/* <Route path="/admin/register-employee" element={<EmployeeRegister/>} /> */}
       
      </Routes>
    </Router>
    </>
  );
}

export default App;
