import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./resources/Homepage/Homepage";
import Userrole from "./resources/Userrole/Userrole";
import Userlogin from "./resources/Userlogin/Userlogin";
import Userregistration from "./resources/Userregistration/Userregistration";
import Adminlogin from "./resources/Adminlogin/Adminlogin";
import Investorhome from "./resources/Investordashboard/Investorhome";
import Admindashboardaccountverification from "./resources/Admindashboard/Admindashboardaccountverification";
import Investorbusinesscatalog from "./resources/Investordashboard/Investorbusinesscatalog";
import Investeedashboardhome from "./resources/Investeedashboard/Investeedashboardhome";
import Investeedashboardlistingcreation from "./resources/Investeedashboard/Investeedashboardlistingcreation";
import Admindashboardlistingverification from "./resources/Admindashboard/Admindashboardlistingverification";
import Investeedashboardlogout from "./resources/Investeedashboard/Investeedashboardlogout";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/admin-login" element={<Adminlogin />} />
          <Route path="/admin/admin-dashboard/account-verification" element={<Admindashboardaccountverification />} />
          <Route path="/admin/admin-dashboard/listing-verification" element={<Admindashboardlistingverification />} />
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
            path="/user/investee-dashboard/home"
            element={<Investeedashboardhome />}
          />
          <Route
            path="/user/investee-dashboard/listing-creation"
            element={<Investeedashboardlistingcreation />}
          />
          <Route
            path="/user/investee-dashboard/logout"
            element={<Investeedashboardlogout />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
