import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Text, Card, CardBody, Stack, Spinner, Divider, IconButton, HStack, Tooltip } from '@chakra-ui/react';
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const Investeedashboardnotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRead, setIsRead] = useState(false);


  const navigate = useNavigate()
  const toast = useToast()
  const getNotifications = () => {
    try {
      setLoading(true)
      const token = window.localStorage.getItem('token');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/get-notifications`, {
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
            setLoading(false)

          } else {
            toast({
              title: "Network Error",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      navigate("/")
    }
  };
  const markAsRead = (notificationId) => {
    try {
      const token = window.localStorage.getItem('token');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/set-mark-as-read`, {
        method: "PUT",
        body: JSON.stringify({
          notificationId
        }),
        headers: {
          'token': token,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            try {
            
              const token = window.localStorage.getItem('token');
              fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/get-notifications`, {
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
                  }
                })
                .catch((err) => console.log(err));
            } catch (error) {
              // navigate("/")
            }
          } else {
            toast({
              title: "Network Error",
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
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
      {loading ? (<><Stack width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack></>) : (<>
        <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
          <Card size={"md"} width={{ base: "100%", md: "80%", lg: "70%" }}>
            <CardBody>
              {notifications?.map(noti => (
                <>
                  {noti?.isRead ? (<>
                    <Stack bgColor={"grey.400"}>
                      <HStack margin={2} justifyContent={"space-between"}>
                        <Text margin={2} >{noti?.message}</Text>

                      </HStack>
                      <Text textAlign={"right"} color={"grey"} fontSize={12}>{noti?.createdAt}</Text>
                    </Stack>

                  </>) : (<>
                    <Stack>
                      <HStack margin={2} justifyContent={"space-between"}>
                        <Text margin={2} >{noti?.message}</Text>
                        {isRead ? (<>

                        </>) : (<>
                          <Tooltip hasArrow label='Mark as read' bg='blue.600'>
                            <IconButton onClick={() => { markAsRead(noti?._id) }} fontSize={15} icon={<IoCheckmarkDoneSharp />} />
                          </Tooltip>
                        </>)}

                      </HStack>
                      <Text textAlign={"right"} color={"grey"} fontSize={12}>{noti?.createdAt}</Text>

                    </Stack>
                  </>)}

                  <Divider />
                </>
              ))}

            </CardBody>
          </Card>
        </Stack>
      </>)}
    </Sidebar>
  )
}

export default Investeedashboardnotification