import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Center, HStack, Input, Text, Box, Card, CardHeader, Heading, CardBody, CardFooter, Button, InputRightAddon, InputGroup , Spinner, Stack, useToast, Tr, Td,} from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import JTable from './components/JTable';

const Investordashboardbusinesscatalog = () => {
  const [listing, setListing] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
const toast=useToast()
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-Business-Catalog";
      getListing();
    } else {
      navigate("/user-login");
    }
  }, []);
  const getListing = () => {
    setLoading(true)
    const token1 = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/get-listing`, {
      method: "GET",
      headers: {
        'token': token1,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setListing(res.listing)
          setLoading(false)
        } else {
          toast({
            title: "Network Error",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          setLoading(false)
        }
      })
      .catch((err) => console.log(err));
  };
  const searchCourse = () => {
    const token1 = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/search-listing`, {
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
        if (res.status) {
          console.log(res.listing)
          setListing(res.listing)
        }
      })
  }
  const handleInputChange = (event, setState) => {
    setState(event.target.value);

  }
  return (
    <>

      <Sidebar>
        {/* <Center>
          <HStack   width={{ base: "100%", md: "50%", lg: "50%" }}>
            <InputGroup>
              <Input border={"0.8px solid grey"} variant='outline' placeholder='Enter keywords to search' onChange={(event) => { handleInputChange(event, setSearch); searchCourse(); }} />
              <InputRightAddon>
                <IoMdSearch size={"2em"} />
              </InputRightAddon>
            </InputGroup>
          </HStack>
        </Center>
        {loading ? (<>
          <Stack alignItems={'center'} justifyContent={'center'}>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Stack>
        </>) : (<>

          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {listing?.length > 0 ? (<>
              {listing?.map((item) =>

              (
                <Card align="center" width={"350px"} margin={"10px"}>
                  <CardHeader>
                    <Heading size="md">{item?.investee_id?.businessName}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text noOfLines={[1, 2, 3]}>
                      <span style={{ fontWeight: "bold" }}>Description : </span>
                      {item?.description}

                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Required Amount : </span>
                      Rs {item?.amount}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Profit Share Percentage : </span>
                      {item?.profitPercentage}%
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Investment Duration : </span>
                      {item?.investmentDuration} years
                    </Text>
                  </CardBody>
                  <CardFooter>
                    <Button
                      colorScheme="blue"
                      margin={"10px"}
                      size="lg"
                    >
                      <Link to={`/user/investor-dashboard/business-catalog/listing/${item._id}`}>
                        View
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </>) : (<><Text>no listing available</Text></>)}

          </Box>
        </>)} */}
         {listing.length > 0 && <JTable
                    tableData={listing}
                    tableHeads={['Business Name', 'Business Description','Amount Required','Investment Duration','Profit Share Percentage']}
                    tableRender={(index, listing) => {
                        return <Row key={index} listing={listing} />
                    }}
                    bg='white'
                />}
      </Sidebar>
    </>
  )
}

const Row = ({ listing }) => {

  return <Tr
      _hover={{
          backgroundColor: 'gray.100',
          cursor: 'pointer'
      }}
  >
      <Td style={{ fontWeight: 'bold' }} color={"blue"}><Link to={`/user/investor-dashboard/business-catalog/listing/${listing?._id}`} >{listing?.investee_id?.businessName}</Link></Td>
      <Td>{listing?.description.slice(0,80)}... </Td>
      <Td>Rs {listing?.amount} /- </Td>
      <Td>{listing?.investmentDuration} years </Td>
      <Td>{listing?.profitPercentage} % </Td>



      {/* <Td>{investor?.email}</Td>
      <Td>{investor?.phoneNumber}</Td>
      <Td>{investor?.cnic}</Td> */}
      {/* <Td>{investee?.isVerified?"verified":"not verified"}</Td> */}
  </Tr>
}

export default Investordashboardbusinesscatalog