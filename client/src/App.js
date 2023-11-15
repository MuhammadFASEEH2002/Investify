import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./resources/Homepage/Homepage";
import Userrole from "./resources/Userrole/Userrole";
import Userlogin from "./resources/Userlogin/Userlogin";
import Userregistration from "./resources/Userregistration/Userregistration";
import Adminlogin from "./resources/Adminlogin/Adminlogin";
import Investorhome from "./resources/Investordashboard/Investorhome";
import Investeedashboard from "./resources/Investeedashboard/Investeedashboard";
import Admindashboardaccountverification from "./resources/Admindashboard/Admindashboardaccountverification";
import Investorbusinesscatalog from "./resources/Investordashboard/Investorbusinesscatalog";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/admin-login" element={<Adminlogin />} />
          <Route path="/admin/admin-dashboard/account-verification" element={<Admindashboardaccountverification />} />
          <Route path="/user-login" element={<Userlogin />} />
          <Route path="/user-registration/user-role" element={<Userrole />} />
          <Route path="/user-registration" element={<Userregistration />} />
          <Route
            path="/user/investor-dashboard/home"
            element={<Investorhome />}
          />
             <Route
            path="/user/investor-dashboard/business-catalog"
            element={<Investorbusinesscatalog />}
          />
          <Route
            path="/user/investee-dashboard"
            element={<Investeedashboard />}
          />
      
        </Routes>
      </Router>
    </>
  );
}

export default App;
