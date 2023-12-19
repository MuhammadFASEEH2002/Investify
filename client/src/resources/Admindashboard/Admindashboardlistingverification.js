import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Box,
  StackDivider,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,

} from "@chakra-ui/react";
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { wrap } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Admindashboardlistingverification = () => {
  const toast = useToast();

  const [listing, setListing] = useState([]);
  useEffect(() => {
    document.title = "Investify | Admin-Account Verification";
    getListing();
  }, []);
  const getListing = () => {
    const adminToken = window.localStorage.getItem('adminToken');

    fetch("http://127.0.0.1:3001/api/admin/get-listing", {
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
  // const approveInvestee = (investeeId, investeeEmail) => {
  //   const adminToken = window.localStorage.getItem('adminToken');
  //   fetch("http://127.0.0.1:3001/api/admin/verify-investees", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       investeeId,
  //       investeeEmail,
  //     }),
  //     headers: {
  //       'token': adminToken,
  //       'Accept': "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       if (res.status) {
  //         toast({
  //           title: "User Approved",
  //           description: res.message,
  //           status: "success",
  //           duration: 9000,
  //           isClosable: true,
  //         });
  //         getInvestees();
  //       } else {
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  // const declineInvestee = (investeeId, investeeEmail) => {
  //   const adminToken = window.localStorage.getItem('adminToken');
  //   fetch("http://127.0.0.1:3001/api/admin/decline-investees", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       investeeId,
  //       investeeEmail,
  //     }),
  //     headers: {
  //       'token': adminToken,
  //       'Accept': "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       if (res.status) {
  //         toast({
  //           title: "User Declined",
  //           description: "Reasons are mailed",
  //           status: "error",
  //           duration: 9000,
  //           isClosable: true,
  //         });
  //         getInvestees();
  //       } else {
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };
  const { isOpen, onOpen, onClose } = useDisclosure()
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
                <Button onClick={onOpen}>Read More</Button>

                <Modal onClose={onClose} isOpen={isOpen} isCentered>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>item.investee_id.businessName</ModalHeader>
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
                  {item.email}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Address : </span>
                  {item.address}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Zipcode : </span>
                  {item.zipcode}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Phone Number : </span>
                  {item.phoneNumber}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Country,City : </span>
                  {item.country},{item.city}
                </Text>
                <Link href={`http://127.0.0.1:3001/investee/${item.cnicDoc}`} isExternal>Cnic<ExternalLinkIcon mx='2px' /></Link>
              </CardBody>
              <CardFooter>
                <Button colorScheme="gray" margin={"10px"}
                  onClick={() => {
                    // declineInvestee(item._id, item.email);
                  }}
                >
                  Decline
                </Button>
                <Button
                  colorScheme="blue"
                  margin={"10px"}
                  onClick={() => {
                    // approveInvestee(item._id, item.email);
                  }}
                >
                  Approve
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Box>
      </Sidebar>
    </>
  )
}

export default Admindashboardlistingverification
