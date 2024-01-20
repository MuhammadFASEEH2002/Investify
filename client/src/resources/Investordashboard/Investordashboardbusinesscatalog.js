import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Center, HStack, Input, Text, Box, Card, CardHeader, Heading, CardBody, CardFooter, Button } from "@chakra-ui/react";


const Investordashboardbusinesscatalog = () => {
  const [listing, setListing] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Investify | Investor-Business-Catalog";
    getListing();
  }, []);
  const getListing = () => {
    const token1 = window.localStorage.getItem('token1');

    fetch("http://127.0.0.1:3001/api/investor/get-listing", {
      method: "GET",
      headers: {
        'token': token1,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setListing(data.listing))
      .catch((err) => console.log(err));
  };
  const searchCourse = () => {
    const token1 = window.localStorage.getItem('token1');
    // console.log(search)
    fetch("http://127.0.0.1:3001/api/investor/search-listing", {
      method: "POST",
      body: JSON.stringify({
        search
      }),
      headers: {
        'token': token1,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },

    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if(res.status){
          console.log(res.listing)
          setListing(res.listing)
        }
      })
    // const { data } = await api.post('/api/search', { search: search } )
    // if (data.status) {
    //     setSearchCourses(data.courses)
    // }
  }
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
    
}
  return (
    <>
     
      <Sidebar>
        <Center>
          <HStack width={'50%'}>
            <Input variant='outline' placeholder='Enter keywords to search'  onChange={(event) => { handleInputChange(event, setSearch); searchCourse(); }}/>
          </HStack>
        </Center>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
          }}
        >
          {listing?.map((item) =>

          (
            <Card align="center" width={"350px"} margin={"10px"}>
              <CardHeader>
                <Heading size="md">{item.investee_id.businessName}</Heading>
              </CardHeader>
              <CardBody>
                <Text noOfLines={[1, 2, 3]}>
                  <span style={{ fontWeight: "bold" }}>Description : </span>
                  {item.description}

                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Required Amount : </span>
                  Rs {item.amount}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Profit Share Percentage : </span>
                  {item.profitPercentage}%
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Investment Duration : </span>
                  {item.investmentDuration} years
                </Text>
                

              </CardBody>
              <CardFooter>
                <Button
                  colorScheme="blue"
                  margin={"10px"}
size="lg"
                >
                  View
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Box>
      </Sidebar>
    </>
  )
}

export default Investordashboardbusinesscatalog