import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import {
  Heading,
  Stack,
  Text,
  Button,
  useToast,
  Box,
  Link,
  Spinner
} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Admindashboardaccountverification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();


  const [investee, setInvestee] = useState([]);
  useEffect(() => {
   
    if(window.localStorage.getItem('adminToken')){
      document.title = "Investify | Admin-Account Verification";
      setIsLoading(true);
      getInvestees();
      setIsLoading(false);
    }else{
      navigate("/admin-login");
    }
  }, []);
  const getInvestees = () => {
    const adminToken = window.localStorage.getItem('adminToken');

    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-investees`, {
      method: "GET",
      headers: {
        'token': adminToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setInvestee(data.investee))
      .catch((err) => console.log(err));
  };
  const approveInvestee = (investeeId, investeeEmail) => {
    const adminToken = window.localStorage.getItem('adminToken');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/verify-investees`, {
      method: "POST",
      body: JSON.stringify({
        investeeId,
        investeeEmail,
      }),
      headers: {
        'token': adminToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status) {
          toast({
            title: "User Approved",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          getInvestees();
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  const declineInvestee = (investeeId, investeeEmail) => {
    const adminToken = window.localStorage.getItem('adminToken');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/decline-investees`, {
      method: "POST",
      body: JSON.stringify({
        investeeId,
        investeeEmail,
      }),
      headers: {
        'token': adminToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status) {
          toast({
            title: "User Declined",
            description: "Reasons are mailed",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          getInvestees();
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  return (

    <>
      <Sidebar>
      <Heading textAlign={"center"}>Account Verification</Heading>

        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent:'center'
          }}
        >
          {isLoading ? (
            <Stack alignItems={'center'} justifyContent={'center'}>
              <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
              />
            </Stack>
          ) : (
            investee.length > 0 ? (
          investee?.map((item) =>

          (
            <Card align="center" width={"350px"} margin={"10px"}>
              <CardHeader>
                <Heading size="md">{item.businessName}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Category : </span>
                  {item.category}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Email : </span>
                  {item.email}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Address : </span>
                  {item.address}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Zipcode : </span>
                  {item.zipcode}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Phone Number : </span>
                  {item.phoneNumber}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Country,City : </span>
                  {item.country},{item.city}
                </Text>
                <Link href={item.cnicDoc} isExternal>Supporting Document<ExternalLinkIcon mx='2px' /></Link>
              </CardBody>
              <CardFooter>
                <Button colorScheme="gray" margin={"10px"}
                  onClick={() => {
                    declineInvestee(item._id, item.email);
                  }}
                >
                  Decline
                </Button>
                <Button
                  colorScheme="blue"
                  margin={"10px"}
                  onClick={() => {
                    approveInvestee(item._id, item.email);
                  }}
                >
                  Approve
                </Button>
              </CardFooter>
            </Card>
          ))
        ): (
          <Text>No accounts available for verification</Text>
        )
        )}
        </Box>
      </Sidebar>
    </>
  );
};

export default Admindashboardaccountverification;
