import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import {Stack ,  Card, Heading, CardBody,CardHeader, Text} from '@chakra-ui/react';

const Admindashboardhome = () => {
  const [allInvestorCount, setAllInvestorCount] = useState("");
  const [allInvesteeCount, setAllInvesteeCount] = useState("");
  const [approvedInvesteeCount, setApprovedInvesteeCount] = useState("");

  const [allListingCount, setAllListingCount] = useState("");
  const [activeListingCount, setActiveListingCount] = useState("");

  const [verifiedListingCount, setVerifiedListingCount] = useState("");





    useEffect(() => {
        document.title = "Investify | Admin Home";
     
        getStatistics();
      
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
   <Stack spacing='4' >
  
    <Card maxW="sm">
      <CardHeader>
        <Heading size='md'>Listing Statistics</Heading>
      </CardHeader>
      <CardBody>
        <Text>Total Listings: {allListingCount}</Text>
        <Text>{allInvesteeCount}</Text>

      </CardBody>
    </Card>
 
</Stack>
   </Sidebar>
   </>
  )
}

export default Admindashboardhome