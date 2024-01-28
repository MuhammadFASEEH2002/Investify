import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Stack, Card, Heading, CardBody, CardHeader, Text, HStack, Spinner, Divider } from '@chakra-ui/react';
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
    if(window.localStorage.getItem('adminToken')){

      document.title = "Investify | Admin Home";
      setIsLoading(true);
      getStatistics();
      setIsLoading(false);
    }else{
      navigate("/admin-login");


    }

  }, []);
 
  const getStatistics = () => {
    const adminToken = window.localStorage.getItem('adminToken');
    fetch("http://127.0.0.1:3001/api/admin/get-stats", {
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
            <Card maxW="sm" backgroundColor="#3182ce" color="white" boxShadow="md" rounded="lg">
              <CardHeader textAlign="center">
                <Heading size="lg" fontWeight="bold" mb="2">
                  Listing Statistics
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Total listings: {allListingCount}
                </Text>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Total verified listings: {verifiedListingCount}
                </Text>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Total active listings: {activeListingCount}
                </Text>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Listings available for verification: {parseInt(allListingCount) - parseInt(verifiedListingCount)}
                </Text>
                <Divider borderColor="white" mb="4" />
                <Text fontSize="sm" textAlign="center">
                  This information is based on the latest data available.
                </Text>
              </CardBody>
            </Card>

            <Card maxW="sm" backgroundColor="#3182ce" color="white" boxShadow="md" rounded="lg">
              <CardHeader textAlign="center">
                <Heading size="lg" fontWeight="bold" mb="2">
                  Investee Statistics
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Total investee accounts: {allInvesteeCount}
                </Text>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Total verified accounts: {approvedInvesteeCount}
                </Text>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Accounts available for verification: {parseInt(allInvesteeCount) - parseInt(approvedInvesteeCount)}
                </Text>
                <Divider borderColor="white" mb="4" />
                <Text fontSize="sm" textAlign="center">
                  This information is based on the latest data available.
                </Text>
              </CardBody>
            </Card>
            <Card maxW="sm" backgroundColor="#3182ce" color="white" boxShadow="md" rounded="lg">
              <CardHeader textAlign="center">
                <Heading size="lg" fontWeight="bold" mb="2">
                  Investor statistics
                </Heading>
              </CardHeader>
              <CardBody>
                <Text fontSize="xl" textAlign="center" mb="4">
                  Total investor accounts: {allInvestorCount}
                </Text>
                <Divider borderColor="white" mb="4" />
                <Text fontSize="sm" textAlign="center">
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