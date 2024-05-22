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
import Investordashboardnotification from "./resources/Investordashboard/Investordashboardnotification";
import Investordashboardchat from "./resources/Investordashboard/Investordashboardchat";
import Investeedashboardchat from "./resources/Investeedashboard/Investeedashboardchat";
import Investeedashboardallchats from "./resources/Investeedashboard/Investeedashboardallchats";
import Investordashboardallchats from "./resources/Investordashboard/Investordashboardallchats";
import Admindashboardallinvestees from "./resources/Admindashboard/Admindashboardallinvestees";
import Admindashboardallinvestors from "./resources/Admindashboard/Admindashboardallinvestors";
import Investordashboardinitiateinvestment from "./resources/Investordashboard/Investordashboardinitiateinvestment";
import Investordashboardpaymentfailure from "./resources/Investordashboard/Investordashboardpaymentfailure";
import Investordashboardpaymentsuccess from "./resources/Investordashboard/Investordashboardpaymentsuccess";
import Investordashboardinvestmentspage from "./resources/Investordashboard/Investordashboardinvestmentspage";
import Investeedashboardinvestmentspage from "./resources/Investeedashboard/Investeedashboardinvestmentspage";
import Investeedashboardchatsupport from "./resources/Investeedashboard/Investeedashboardchatsupport";
import Investordashboardchatsupport from "./resources/Investordashboard/Investordashboardchatsupport";
import Admindashboardallchats from "./resources/Admindashboard/Admindashboardallchats";
import Admindashboardchatsupport from "./resources/Admindashboard/Admindashboardchatsupport";
import Admindashboardtransactions from "./resources/Admindashboard/Admindashboardtransactions";
import Admindashboardinvestments from "./resources/Admindashboard/Admindashboardinvestments";
import Investordashboardinvestmentdetail from "./resources/Investordashboard/Investordashboardinvestmentdetail";
import Investeedashboardinvestmentdetail from "./resources/Investeedashboard/Investeedashboardinvestmentdetail";
import Admindashboardinvestmentdetail from "./resources/Admindashboard/Admindashboardinvestmentdetail";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* admin routes */}
          <Route exact path="/" element={<Homepage />} />
          <Route path="/admin-login" element={<Adminlogin />} />
          <Route path="/admin/admin-dashboard/home" element={<Admindashboardhome />} />
          <Route path="/admin/admin-dashboard/account-verification" element={<Admindashboardaccountverification />} />
          <Route path="/admin/admin-dashboard/listing-verification" element={<Admindashboardlistingverification />} />
          <Route path="/admin/admin-dashboard/all-investees" element={<Admindashboardallinvestees />} />
          <Route path="/admin/admin-dashboard/all-investors" element={<Admindashboardallinvestors />} />
          <Route path="/admin/admin-dashboard/all-support-chats" element={<Admindashboardallchats />} />
          <Route path="/admin/admin-dashboard/chat-support/:id1/:id2" element={<Admindashboardchatsupport />} />
          <Route path="/admin/admin-dashboard/transactions" element={<Admindashboardtransactions />} />
          <Route path="/admin/admin-dashboard/investments" element={<Admindashboardinvestments />} />
          <Route
            path="/admin/admin-dashboard/investment-detail/:id"
            element={<Admindashboardinvestmentdetail />}
          />
          <Route path="/admin/admin-dashboard/logout" element={<Admindashboardlogout />} />
          {/* auth routes */}
          <Route path="/user-login" element={<Userlogin />} />
          <Route path="/user-registration/user-role" element={<Userrole />} />
          <Route path="/user-registration" element={<Userregistration />} />
          {/* investor routes */}
          <Route
            path="/user/investor-dashboard/home"
            element={<Investordashboardhome />}
          />
          <Route
            path="/user/investor-dashboard/business-catalog"
            element={<Investordashboardbusinesscatalog />}
          />
          <Route
            path="/user/investor-dashboard/business-catalog/product-page/:id"
            element={<Investordashboardproductpage />}
          />
          <Route
            path="/user/investor-dashboard/business-catalog/product-page/initiate-investment/:id"
            element={<Investordashboardinitiateinvestment />}
          />
          <Route
            path="/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-success"
            element={<Investordashboardpaymentsuccess />}
          />
          <Route
            path="/user/investor-dashboard/business-catalog/product-page/initiate-investment/payment-failure"
            element={<Investordashboardpaymentfailure />}
          />
          <Route
            path="/user/investor-dashboard/notifications"
            element={<Investordashboardnotification />}
          />
          <Route
            path="/user/investor-dashboard/investments"
            element={<Investordashboardinvestmentspage />}
          />
          <Route
            path="/user/investor-dashboard/logout"
            element={<Investordashboardlogout />}
          />
          <Route
            path="/user/investor-dashboard/chat"
            element={<Investordashboardallchats />}
          />
          <Route
            path="/user/investor-dashboard/chat/:id1/:id2"
            element={<Investordashboardchat />}
          />
          <Route
            path="/user/investor-dashboard/chat-support/:id1/:id2"
            element={<Investordashboardchatsupport />}
          />
          <Route
            path="/user/investor-dashboard/investment-detail/:id"
            element={<Investordashboardinvestmentdetail />}
          />
          {/* investee routes */}
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
            path="/user/investee-dashboard/chat"
            element={<Investeedashboardallchats />}
          />
          <Route
            path="/user/investee-dashboard/chat/:id1/:id2"
            element={<Investeedashboardchat />}
          />
          <Route
            path="/user/investee-dashboard/logout"
            element={<Investeedashboardlogout />}
          />
          <Route
            path="/user/investee-dashboard/investments"
            element={<Investeedashboardinvestmentspage />}
          />
          <Route
            path="/user/investee-dashboard/chat-support/:id1/:id2"
            element={<Investeedashboardchatsupport />}
          />
          <Route
            path="/user/investee-dashboard/investment-detail/:id"
            element={<Investeedashboardinvestmentdetail />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
