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
import { Card, CardHeader, CardBody} from "@chakra-ui/react";


const Investeedashboardlistinghistory = () => {
  const toast = useToast();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState([]);
  useEffect(() => {
    document.title = "Investify | Investee Listing History";
    setIsLoading(true);
    getMyListing();
    setIsLoading(false)
  }, []);
  const getMyListing = () => {
    const adminToken = window.localStorage.getItem('token');

    fetch("http://127.0.0.1:3001/api/investee/get-my-listing-history", {
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
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
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