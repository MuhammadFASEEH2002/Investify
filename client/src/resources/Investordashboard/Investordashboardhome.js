import React, { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { useNavigate } from 'react-router-dom';


const Investordashboardhome = () => {
  const navigate=useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-Home";
    } else {
      navigate("/user-login");
    }
  }, []);
  return (
    <>
  
    <Sidebar>
    <p>Hello</p>
    <p>World</p>
    </Sidebar>

    </>
  )
}

export default Investordashboardhome