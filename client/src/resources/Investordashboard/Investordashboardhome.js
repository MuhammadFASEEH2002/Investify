import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import {
  Card, CardHeader, CardBody, CardFooter, Heading, Box, Stack, StackDivider, Text, Button, ButtonGroup, Divider, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  useToast,
  Spinner
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const Investordashboardhome = () => {

  const [investor, setInvestor] = useState([]);
   
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();
  const getUser = () => {
    setLoading(true)
    const token = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/get-user`, {
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
          setInvestor(res.investor)
          setLoading(false)

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
  };
  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-Home";
      getUser();
    } else {
      navigate("/user-login");
    }
  }, []);
  return (
    <>
  
  <Sidebar>
        {loading ? (<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>) : (<>
          <Card >
            <CardHeader>
              <Heading size='md'>Investor Profile</Heading>
            </CardHeader>

            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Full Name
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investor?.firstName} {investor?.lastName}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Email
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investor?.email}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Phone Number:
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investor?.phoneNumber}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Location
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                     {investor?.city}, {investor?.country}
                  </Text>
                </Box>
              </Stack>
            </CardBody>

          </Card>
        </>)}

      </Sidebar>

    </>
  )
}

export default Investordashboardhome