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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
Spinner
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Admindashboardlistingverification = () => {
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onOpen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  const [listing, setListing] = useState([]);
  useEffect(() => {
    if(window.localStorage.getItem('adminToken')){
      document.title = "Investify | Admin Listing Verification";
      setIsLoading(true);
      getListing();
      setIsLoading(false);
    }else{
      navigate("/admin-login");
    }
  }, []);
  const getListing = () => {
    const adminToken = window.localStorage.getItem('adminToken');

    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-listing`, {
      method: "GET",
      headers: {
        'token': adminToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setListing(data.listing))
      .catch((err) => console.log(err));
  };
  const approveListing = (listingId, listingInvesteeEmail) => {
    const adminToken = window.localStorage.getItem('adminToken');
    console.log(listingInvesteeEmail)
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/verify-listing`, {
      method: "POST",
      body: JSON.stringify({
        listingId,
        listingInvesteeEmail,
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
            title: "Listing Approved",
            description: res.message,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          getListing();
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  const declineListing = (listingId, listingInvesteeEmail) => {
    const adminToken = window.localStorage.getItem('adminToken');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/decline-listing`, {
      method: "POST",
      body: JSON.stringify({
        listingId,
        listingInvesteeEmail,
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
            title: "Listing Verification Declined",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          getListing();
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  // const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Sidebar>
      <Heading textAlign={"center"}>Listing Verification</Heading>

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
            listing.length > 0 ? (
          listing?.map((item) =>

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
                <Link onClick={() => onOpen(item)} color={"blue"}>Read More</Link>

                <Modal onClose={onClose} isOpen={isModalOpen && item === selectedItem} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>{item.investee_id.businessName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Text>
                        {item.description}

                      </Text>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
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
                <Text>
                  <span style={{ fontWeight: "bold" }}>Email : </span>
                  {item.investee_id.email}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Address : </span>
                  {item.investee_id.address}, {item.investee_id.zipcode}, {item.investee_id.city}, {item.investee_id.country}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Phone Number : </span>
                  {item.investee_id.phoneNumber}
                </Text>

              </CardBody>
              <CardFooter>
                <Button colorScheme="gray" margin={"10px"}
                  onClick={() => {
                    declineListing(item._id, item.investee_id.email);
                  }}
                >
                  Decline
                </Button>
                <Button
                  colorScheme="blue"
                  margin={"10px"}
                  onClick={() => {
                    approveListing(item._id, item.investee_id.email);
                  }}
                >
                  Approve
                </Button>
              </CardFooter>
            </Card>
            ))
          ): (
            <Text>No listings available for verification</Text>
          )
          )}
        </Box>
      </Sidebar>
    </>
  )
}

export default Admindashboardlistingverification
