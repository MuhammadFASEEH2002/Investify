import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./resources/Homepage/Homepage";
import Userrole from "./resources/Userrole/Userrole";
import Userlogin from "./resources/Userlogin/Userlogin";
import Userregistration from "./resources/Userregistration/Userregistration";
import Adminlogin from "./resources/Adminlogin/Adminlogin";
import Investordashboardhome from "./resources/Investordashboard/Investordashboardhome";
import Investordashboardbusinesscatalog from "./resources/Investordashboard/Investordashboardbusinesscatalog";
import Investeedashboardhome from "./resources/Investeedashboard/Investeedashboardhome";
import Admindashboardaccountverification from "./resources/Admindashboard/Admindashboardaccountverification";
import Admindashboardlistingverification from "./resources/Admindashboard/Admindashboardlistingverification";
import Admindashboardlogout from "./resources/Admindashboard/Admindashboardlogout";
import Investeedashboardlistingcreation from "./resources/Investeedashboard/Investeedashboardlistingcreation";
import Investeedashboardlogout from "./resources/Investeedashboard/Investeedashboardlogout";
import Investeedashboardchangepassword from "./resources/Investeedashboard/Investeedashboardchangepassword";
import Investeedashboardmylistings from "./resources/Investeedashboard/Investeedashboardmylistings";
import Investeedashboardlistinghistory from "./resources/Investeedashboard/Investeedashboardlistinghistory";
import Investordashboardlogout from "./resources/Investordashboard/Investordashboardlogout";
import Admindashboardhome from "./resources/Admindashboard/Admindashboardhome";
import Investordashboardproductpage from "./resources/Investordashboard/Investordashboardproductpage";
import Investeedashboardnotification from "./resources/Investeedashboard/Investeedashboardnotification";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/admin-login" element={<Adminlogin />} />
          <Route path="/admin/admin-dashboard/home" element={<Admindashboardhome />} />
          <Route path="/admin/admin-dashboard/account-verification" element={<Admindashboardaccountverification />} />
          <Route path="/admin/admin-dashboard/listing-verification" element={<Admindashboardlistingverification />} />
          <Route path="/admin/admin-dashboard/logout" element={<Admindashboardlogout />} />
          <Route path="/user-login" element={<Userlogin />} />
          <Route path="/user-registration/user-role" element={<Userrole />} />
          <Route path="/user-registration" element={<Userregistration />} />
          <Route
            path="/user/investor-dashboard/home"
            element={<Investordashboardhome />}
          />
          <Route
            path="/user/investor-dashboard/business-catalog"
            element={<Investordashboardbusinesscatalog />}
          />
           <Route
            path="/user/investor-dashboard/business-catalog/listing/:id"
            element={<Investordashboardproductpage />}
          />
            <Route
            path="/user/investor-dashboard/logout"
            element={<Investordashboardlogout />}
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
            path="/user/investee-dashboard/investee-listings"
            element={<Investeedashboardmylistings />}
          />
                <Route
            path="/user/investee-dashboard/investee-listing-history"
            element={<Investeedashboardlistinghistory />}
          />
          <Route
            path="/user/investee-dashboard/password-change"
            element={<Investeedashboardchangepassword />}
          />
            <Route
            path="/user/investee-dashboard/notifications"
            element={<Investeedashboardnotification />}
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
