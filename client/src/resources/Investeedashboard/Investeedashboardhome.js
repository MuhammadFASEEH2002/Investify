import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import {
  Card, CardHeader, CardBody, CardFooter, Heading, Box, Stack, StackDivider, Text, Button, ButtonGroup, Divider, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  Input,
  useToast
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";


const Investeedashboardhome = () => {
  const [investee, setInvestee] = useState([]);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const { isOpen: isFirstModalOpen, onOpen: onFirstModalOpen, onClose: onFirstModalClose } = useDisclosure();
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };

  const toast = useToast();
  const navigate = useNavigate();
  const getUser = () => {
    const token = window.localStorage.getItem('token');
    fetch("http://127.0.0.1:3001/api/investee/get-user", {
      method: "GET",
      headers: {
        'token': token,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((investee) => { setInvestee(investee.investee) })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    document.title = "Investify | Investee-Home";
    getUser();
  }, []);
  const openEditModal = (investee) => {
    setAddress(investee.address);
    setZipcode(investee.zipcode);
    onFirstModalOpen();
  };
  const updateProfile = () => {
    const token = window.localStorage.getItem("token");

    if (
address && zipcode
    ) {
        fetch("http://127.0.0.1:3001/api/investee/edit-user", {
          method: "PUT",
          body: JSON.stringify({
         address, zipcode
          }),
          headers: {
            token: token,
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
                title: "Profile Updated",
                description: "Waiting for Admin to verify your profile",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top",
              });
              navigate("/user/investee-dashboard/logout");
            } else {
              // alert(res.message);
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
  return (
    <>
      <Sidebar>
        <Card>
          <CardHeader>
            <Heading size='md'>Business Profile</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Business Name
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.businessName}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Email
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.email}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Phone Number:
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.phoneNumber}
                </Text>
              </Box>
              <Box>
                <Heading size='xs' textTransform='uppercase'>
                  Location
                </Heading>
                <Text pt='2' fontSize='sm'>
                  {investee.address}, {investee.zipcode}, {investee.city}, {investee.country}
                </Text>
              </Box>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue' onClick={() => openEditModal(investee)}>
                Edit Profile
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        <Modal onClose={onFirstModalClose} isOpen={isFirstModalOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>

              <Text>Address</Text>
              <Input
                type="text"
                placeholder="e.g: Plot no, street number, area."
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                value={address}
                isRequired
                onChange={(event) => handleInputChange(event, setAddress)}
              />
              <Text>Zip Code</Text>
              <Input
                type="number"
                placeholder="e.g 74600"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                value={zipcode}

                isRequired
                onChange={(event) => handleInputChange(event, setZipcode)}
              />
            <Button
              colorScheme="teal"
              variant="solid"
              marginTop={"30px"}
              size={{ base: "md", md: "md", lg: "lg" }}
              onClick={() => {updateProfile()}}
            >
              Edit Profile
            </Button>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onFirstModalClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Sidebar>
    </>
  )
}

export default Investeedashboardhome