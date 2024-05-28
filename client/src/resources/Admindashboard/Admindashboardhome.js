import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Stack, Card, Heading, CardBody, CardHeader, Text, HStack, Spinner, Divider, CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Admindashboardhome = () => {
  const [allInvestorCount, setAllInvestorCount] = useState("");
  const [allInvesteeCount, setAllInvesteeCount] = useState("");
  const [approvedInvesteeCount, setApprovedInvesteeCount] = useState("");

  const [allListingCount, setAllListingCount] = useState("");
  const [activeListingCount, setActiveListingCount] = useState("");

  const [verifiedListingCount, setVerifiedListingCount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();





  useEffect(() => {
    if (window.localStorage.getItem('adminToken')) {

      document.title = "Investify | Admin Home";
      setIsLoading(true);
      getStatistics();
      setIsLoading(false);
    } else {
      navigate("/admin-login");


    }

  }, []);

  const getStatistics = () => {
    const adminToken = window.localStorage.getItem('adminToken');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-stats`, {
      method: "GET",
      headers: {
        'token': adminToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setAllInvestorCount(res.allInvestorCount);
          setAllInvesteeCount(res.allInvesteeCount);
          setApprovedInvesteeCount(res.approvedInvesteeCount);
          setAllListingCount(res.allListingCount);
          setActiveListingCount(res.activeListingCount);
          setVerifiedListingCount(res.verifiedListingCount);
        }
      })


      .catch((err) => console.log(err));
  };
  return (
    <>
      <Sidebar>
      <Heading textAlign={"center"}>Dashboard</Heading>

        <HStack spacing='4' flexWrap="wrap" justifyContent="center" alignItems="flex-start">
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
          ) : (<>
            <Card maxW="sm" backgroundColor="white" boxShadow="md" rounded="lg">
              <CardHeader textAlign="center">
                <Heading fontWeight="bold" fontSize={25}>
                  Listing Statistics
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack alignItems={"center"} justifyContent={"center"} mb={2}>
                  <CircularProgress value={(((parseInt(allListingCount) - parseInt(verifiedListingCount)) / allListingCount) * 100)} size='100px' color='blue.400'>
                    <CircularProgressLabel fontSize={15}>{(((parseInt(allListingCount) - parseInt(verifiedListingCount)) / allListingCount) * 100).toFixed(2)}%</CircularProgressLabel>
                  </CircularProgress>
                </Stack>
                <Text fontSize="15" textAlign="center" mb="2">
                  Total listings: {allListingCount}
                </Text>
                <Text fontSize="15" textAlign="center" mb="2">
                  Total verified listings: {verifiedListingCount}
                </Text>
                <Text fontSize="15" textAlign="center" mb="2">
                  Total active listings: {activeListingCount}
                </Text>
                <Text fontSize="15" textAlign="center" mb="2">
                  Listings available for verification: {parseInt(allListingCount) - parseInt(verifiedListingCount)}
                </Text>
                <Divider mb="2" />
                <Text fontSize="10" textAlign="center">
                  This information is based on the latest data available.
                </Text>
              </CardBody>
            </Card>

            <Card maxW="sm" backgroundColor="white" boxShadow="md" rounded="lg">
              <CardHeader textAlign="center">
                <Heading size="lg" fontWeight="bold" fontSize={25}>
                  Investee Statistics
                </Heading>
              </CardHeader>
              <CardBody>
                <Stack alignItems={"center"} justifyContent={"center"} mb={2}>
                  <CircularProgress value={(((parseInt(allInvesteeCount) - parseInt(approvedInvesteeCount)) / allInvesteeCount) * 100)} size='100px' color='blue.400'>
                    <CircularProgressLabel fontSize={15}>{(((parseInt(allInvesteeCount) - parseInt(approvedInvesteeCount)) / allInvesteeCount) * 100).toFixed(2)}%</CircularProgressLabel>
                  </CircularProgress>
                </Stack>
                <Text fontSize="15" textAlign="center" mb="2">
                  Total investee accounts: {allInvesteeCount}
                </Text>
                <Text fontSize="15" textAlign="center" mb="2">
                  Total verified accounts: {approvedInvesteeCount}
                </Text>
                <Text fontSize="15" textAlign="center" mb="2">
                  Accounts available for verification: {parseInt(allInvesteeCount) - parseInt(approvedInvesteeCount)}
                </Text>
                <Divider mb="2" />
                <Text fontSize="10" textAlign="center">
                  This information is based on the latest data available.
                </Text>
              </CardBody>
            </Card>
            <Card maxW="sm" backgroundColor="white" boxShadow="md" rounded="lg">
              <CardHeader textAlign="center">
                <Heading size="lg" fontWeight="bold" fontSize={25}>
                  Investor statistics
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="15" textAlign="center" mb="2">
                  Total investor accounts: {allInvestorCount}
                </Text>
                <Divider mb="2" />
                <Text fontSize="10" textAlign="center">
                  This information is based on the latest data available.
                </Text>
              </CardBody>
            </Card>
          </>
          )
          }
        </HStack>
      </Sidebar>
    </>
  )
}

export default Admindashboardhome