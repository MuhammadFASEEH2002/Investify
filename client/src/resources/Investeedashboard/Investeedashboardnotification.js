import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Investeedashboardnotification = () => {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate()
  const toast = useToast()
  const getNotifications = () => {
    try {
      const token = window.localStorage.getItem('token');
      fetch("http://127.0.0.1:3001/api/investee/get-notifications", {
        method: "GET",
        headers: {
          'token': token,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            setNotifications(res.notifications)
          } else {
            toast({
              title: "Network Error",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            navigate("/")
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      navigate("/")
    }
  };
  useEffect(() => {
    document.title = "Investify | Investee-Notifications";
    try {
      getNotifications()
    } catch (error) {
      navigate("/")
    }
  }, []);
  return (
    <Sidebar>
      {notifications.map(noti => (
        <Text>{noti.message}</Text>
      ))}
    </Sidebar>
  )
}

export default Investeedashboardnotification