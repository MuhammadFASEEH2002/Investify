import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Card, CardHeader, CardBody, CardFooter, Heading, Box, Stack, StackDivider, Text, Button, ButtonGroup, Divider } from '@chakra-ui/react'

const Investeedashboardhome = () => {
  const [investee, setInvestee] = useState([]);

  const getUser = () => {
    const token = window.localStorage.getItem('token');
    fetch("http://127.0.0.1:3001/api/investee/get-user", {
      method: "GET",
      headers: {
        'token': token,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((investee) => { setInvestee(investee.investee) })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    document.title = "Investify | Investee-Home";
    getUser();
  }, []);
  return (
    <>
      <Sidebar>
        <Card>
          <CardHeader>
            <Heading size='md'>User Details</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Business Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.businessName}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Email
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.email}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Phone Number:
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.phoneNumber}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Location
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.address}, {investee.zipcode}, {investee.city}, {investee.country}
                </Text>
              </Box>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                Edit Details
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      </Sidebar>
    </>
  )
}

export default Investeedashboardhome