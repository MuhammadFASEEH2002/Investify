import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { Center, HStack, Input, Text, Box, Card, CardHeader, Heading, CardBody, CardFooter, Button, InputRightAddon, InputGroup, Spinner, Stack, useToast, Tr, Td} from "@chakra-ui/react";
import { IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import JTable from './components/JTable';

const Investordashboardbusinesscatalog = () => {
  const [listing, setListing] = useState([]);
  // const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false)
  const toast = useToast()
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

  return (
    <>

      <Sidebar>
      <Heading textAlign={"center"}>Business Catalog</Heading>

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
          {listing.length > 0 ? (
            <JTable
              tableData={listing}
              tableHeads={['Business Name', 'Business Description', 'Amount Required', 'Investment Duration', 'Profit Share Percentage']}
              tableRender={(index, listing) => {
                return <Row key={index} listing={listing} />;
              }}
              bg='white'
            />
          ) : (
            <p>No listings found.</p>
          )}
        </>)}

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
    <Td style={{ fontWeight: 'bold' }} color={"blue"}><Link to={`/user/investor-dashboard/business-catalog/product-page/${listing?._id}`} >{listing?.investee_id?.businessName}</Link></Td>
    <Td>{listing?.description.slice(0, 80)}... </Td>
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