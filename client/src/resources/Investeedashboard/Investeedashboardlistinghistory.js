import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
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
import { Card, CardHeader, CardBody } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';

const Investeedashboardlistinghistory = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      document.title = "Investify | Investee Listing History";

      getMyListing();

    } else {
      navigate("/user-login");
    }
  }, []);
  const getMyListing = () => {
    setIsLoading(true)
    const token = window.localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/get-my-listing-history`, {
      method: "GET",
      headers: {
        'token': token,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setListing(res.listing)
          setIsLoading(false)
        } else {
          toast({
            title: "Network Error",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          setIsLoading(false)
        }
      })
      .catch((err) => console.log(err));
  };
  // const { isOpen, onOpen, onClose } = useDisclosure()
  const onOpen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  return (
    <>
      <Sidebar>
      <Heading textAlign={"center"}>In-active Listings</Heading>

        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: 'center'
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
            listing?.length > 0 ? (
              listing?.map((item) =>
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
                    <Link onClick={() => onOpen(item)} color={"blue"}>Read More</Link>

                    <Modal onClose={onClose} isOpen={isModalOpen && item === selectedItem} isCentered>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>{item?.investee_id?.businessName}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text>
                            {item?.description}

                          </Text>
                        </ModalBody>
                        <ModalFooter>
                          <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Amount: </span>
                      Rs {Number(item?.amount).toLocaleString('en-IN')}
                    </Text>

                    <Text>
                      <span style={{ fontWeight: "bold" }}>Email : </span>
                      {item?.investee_id?.email}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Address : </span>
                      {item?.investee_id?.address}, {item?.investee_id?.zipcode}, {item?.investee_id?.city}, {item?.investee_id?.country}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Phone Number : </span>
                      {item?.investee_id?.phoneNumber}
                    </Text>

                  </CardBody>

                </Card>
              ))
            ) : (
              <Text>No listings deleted</Text>
            )
          )}
        </Box>
      </Sidebar>
    </>
  )
}

export default Investeedashboardlistinghistory