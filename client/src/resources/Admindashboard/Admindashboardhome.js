import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import {Stack ,  Card, Heading, CardBody,CardHeader, Text, HStack, Spinner} from '@chakra-ui/react';
import { wrap } from 'framer-motion';

const Admindashboardhome = () => {
  const [allInvestorCount, setAllInvestorCount] = useState("");
  const [allInvesteeCount, setAllInvesteeCount] = useState("");
  const [approvedInvesteeCount, setApprovedInvesteeCount] = useState("");

  const [allListingCount, setAllListingCount] = useState("");
  const [activeListingCount, setActiveListingCount] = useState("");

  const [verifiedListingCount, setVerifiedListingCount] = useState("");
  const [isLoading, setIsLoading] = useState(true);





    useEffect(() => {
        document.title = "Investify | Admin Home";
     setIsLoading(true);
        getStatistics();
     setIsLoading(false);
      
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
            if(res.status){
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
          ):(<>
    <Card maxW="sm" backgroundColor={"#3182ce"} color={"white"}>
      <CardHeader>
        <Heading size='lg'>Listing Statistics</Heading>
      </CardHeader>
      <CardBody>
        <Text>Total Listings: {allListingCount}</Text>
        <Text>Total Verified Listings: {verifiedListingCount}</Text>
        <Text>Total Active Listings: {activeListingCount}</Text>
      </CardBody>
    </Card>

    <Card maxW="sm"  backgroundColor={"#3182ce"} color={"white"}>
      <CardHeader>
        <Heading size='lg'>Investee Statistics</Heading>
      </CardHeader>
      <CardBody>
        <Text>Total Investee Accounts: {allInvesteeCount}</Text>
        <Text>Total Verified Accounts: {approvedInvesteeCount}</Text>
      </CardBody>
    </Card>
    <Card maxW="sm"  backgroundColor={"#3182ce"} color={"white"}>
      <CardHeader>
        <Heading size='lg'>Investor Statistics</Heading>
      </CardHeader>
      <CardBody>
        <Text>Total Investor Accounts: {allInvestorCount}</Text>
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