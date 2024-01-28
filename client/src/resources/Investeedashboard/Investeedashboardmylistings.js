import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Input,
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
  useDisclosure,
  Textarea,
  Spinner
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Investeedashboardmylistings = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const [listing, setListing] = useState([]);
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      document.title = "Investify | Investee Listings";
      setIsLoading(true);
      getMyListing();
      setIsLoading(false);
    } else {
      navigate("/user-login");
    }
  }, []);
  const editListing = (listingId, listingInvesteeEmail) => {
    const token = window.localStorage.getItem('token');
    if (
      description && profitPercentage && amount && investmentDuration
    ) {
      fetch("http://127.0.0.1:3001/api/investee/edit-listing", {
        method: "PUT",
        body: JSON.stringify({
          description, profitPercentage, amount, investmentDuration, listingId, listingInvesteeEmail
        }),
        headers: {
          'token': token,
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
              title: "Listing Edited",
              description: "Awaiting for admin verification to be published again",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            navigate("/user/investee-dashboard/home");
          } else {
            toast({
              title: "Authentication Error",
              description: res.message,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .catch((err) => console.log(err));
    }
    else {
      toast({
        title: "Fields Are Empty",
        description: "Kindly fill all the fields with correct data",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const getMyListing = () => {
    const adminToken = window.localStorage.getItem('token');

    fetch("http://127.0.0.1:3001/api/investee/get-my-listings", {
      method: "GET",
      headers: {
        'token': adminToken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => { setListing(data.listing) })
      .catch((err) => console.log(err));
  };
  const { isOpen: isSecondModalOpen, onOpen: onSecondModalOpen, onClose: onSecondModalClose } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onOpen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const onClose = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };
  const deleteListing = (listingId, listingInvesteeEmail) => {
    const token = window.localStorage.getItem('token');
    fetch("http://127.0.0.1:3001/api/investee/delete-listing", {
      method: "POST",
      body: JSON.stringify({
        listingId,
        listingInvesteeEmail,
      }),
      headers: {
        'token': token,
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
            title: "Listing Deleted",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          getMyListing();
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  const openEditModal = (item) => {
    setDescription(item.description);
    setProfitPercentage(item.profitPercentage);
    setInvestmentDuration(item.investmentDuration);
    setAmount(item.amount);
    onSecondModalOpen();
  };
  return (
    <>
      <Sidebar>
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
            </Stack>) : (
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
                      <span style={{ fontWeight: "bold" }}>Amount Required : </span>
                      Rs {item.amount}
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Profit Percentage : </span>
                      {item.profitPercentage}%
                    </Text>
                    <Text>
                      <span style={{ fontWeight: "bold" }}>Investment Duration : </span>
                      {item.investmentDuration} year
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
                        deleteListing(item._id, item.investee_id.email);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      colorScheme="blue"
                      margin={"10px"}
                      onClick={() => openEditModal(item)}

                    >
                      Edit
                    </Button>
                    <Modal onClose={onSecondModalClose} isOpen={isSecondModalOpen} size={"full"} isCentered>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                          <HStack
                            width={"100%"}
                            flexDirection={{ base: "column", md: "row", lg: "row" }}
                            spacing={"0px"}
                            alignItems={"center"}
                            justifyContent={"center"}
                          >
                            <Stack width={{ base: "100%", md: "50%", lg: "50%" }} spacing={"0px"} alignItems={"center"} justifyContent={"center"}>
                              <HStack width={"100%"}>
                                <Stack width={"100%"}>
                                  <Text>Business Description</Text>
                                  <Textarea
                                    placeholder="Describe your business in not more than 200 words."
                                    width={"90%"}
                                    variant={"filled"}
                                    border={"0.5px solid grey"}
                                    value={description}
                                    onChange={(event) =>
                                      handleInputChange(event, setDescription)
                                    }
                                    isRequired
                                  />
                                </Stack>
                              </HStack>
                              <HStack width={"100%"}>
                                <Stack width={"100%"}>
                                  <Text>Profit Share Percentage</Text>
                                  <Input
                                    type="number"
                                    placeholder="should not be more than 30%"
                                    width={"90%"}
                                    variant={"filled"}
                                    border={"0.5px solid grey"}
                                    value={profitPercentage}
                                    isRequired
                                    onChange={(event) => handleInputChange(event, setProfitPercentage)}
                                  />
                                </Stack>
                              </HStack>
                              <HStack width={"100%"}>
                                <Stack width={"100%"}>
                                  <Text>Investment Duration</Text>
                                  <Input
                                    type="number"
                                    placeholder="Enter the duration of investment in years"
                                    width={"90%"}
                                    variant={"filled"}
                                    border={"0.5px solid grey"}
                                    value={investmentDuration}
                                    isRequired
                                    onChange={(event) => handleInputChange(event, setInvestmentDuration)}
                                  />
                                </Stack>
                              </HStack>
                              <HStack width={"100%"}>
                                <Stack width={"100%"}>
                                  <Text>Amount Required</Text>
                                  <Input
                                    type="number"
                                    placeholder="max amount allowed is Rs 25,000"
                                    width={"90%"}
                                    variant={"filled"}
                                    border={"0.5px solid grey"}
                                    isRequired
                                    value={amount}

                                    onChange={(event) => handleInputChange(event, setAmount)}
                                  />
                                </Stack>
                              </HStack>
                              <Button
                                colorScheme="teal"
                                variant="solid"
                                marginTop={"30px"}
                                size={{ base: "md", md: "md", lg: "lg" }}
                                onClick={() => { editListing(item._id, item.investee_id.email) }}
                              >
                                Update
                              </Button>
                            </Stack>

                          </HStack>
                        </ModalBody>
                        <ModalFooter>
                          <Button onClick={onSecondModalClose}>Close</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </CardFooter>
                </Card>
              ))
            ) : (

              <Text>No current listings created.</Text>

            )
          )}
        </Box>
      </Sidebar>
    </>
  )
}

export default Investeedashboardmylistings