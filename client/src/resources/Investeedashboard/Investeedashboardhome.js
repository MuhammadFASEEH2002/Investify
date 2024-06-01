import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import {
  Card, CardHeader, CardBody, CardFooter, Heading, Box, Stack, StackDivider, Text, ButtonGroup,
  useToast,
  Spinner,
  HStack, Button
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { IoGrid } from 'react-icons/io5';
import { FiList } from 'react-icons/fi';
import { MdDelete } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { db } from '../../utils/firebase';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  getDocs,
  doc
} from "firebase/firestore";

const Investeedashboardhome = () => {
  const [investee, setInvestee] = useState([]);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalListingCount, setTotalListingCount] = useState("");
  const [totalFundingAmount, setTotalFundingAmount] = useState("");

  const [activeListingCount, setActiveListingCount] = useState("");
  const [deletedListingCount, setDeletedListingCount] = useState("");
  const messagesRef = collection(db, 'messages');
  // const investeeID=  investee?._id
  // const token = window.localStorage.getItem('token');



  // const { isOpen: isFirstModalOpen, onOpen: onFirstModalOpen, onClose: onFirstModalClose } = useDisclosure();
  // const handleInputChange = (event, setState) => {
  //   setState(event.target.value);
  // };
  // const checkIfNumber = (event) => {
  //   const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
  //   return !event.key.match(regex) && event.preventDefault();
  // }

  const toast = useToast();
  const navigate = useNavigate();
  const getUser = () => {
    setLoading(true)
    const token = window.localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/get-user`, {
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
          setInvestee(res.investee)
      // updateStatus(res.investee._id)
    


          setLoading(false)

        } else {
          toast({
            title: "Network Error, Reload Again",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });

        }
      })
      .catch((err) => console.log(err));
  };
  const getStats = () => {
    setLoading(true)

    const token = window.localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/get-stats`, {
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
          setTotalListingCount(res.TotalListingCount)
          setActiveListingCount(res.ActiveListingCount)
          setDeletedListingCount(res.DeletedListingCount)
          setTotalFundingAmount(res.TotalFundingAmount)
          setLoading(false)

        } else {
          toast({
            title: "Network Error, Reload Again",
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
  // const updateStatus = async (investeeID) => {
  //   console.log(investeeID)
  //   const queryMessages = query(
  //     messagesRef,
  //     where("userId", "==", investeeID)
  //   );
  //   const querySnapshot = await getDocs(queryMessages);
  //   // console.log(querySnapshot)
  //   querySnapshot.forEach((document) => {
  //     console.log(document.id)
  //     const documentRef = doc(db, "messages", document.id);
  //     updateDoc(documentRef, {
  //       online: true
  //     })
  //   });

  // }
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      document.title = "Investify | Investee-Home";
      getUser()
      getStats()
    } else {
      navigate("/user-login");
    }
  }, []);

  return (
    <>
      <Sidebar>
      <Heading textAlign={"center"}>Dashboard</Heading>

        {loading ? (<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>) : (<>
          <HStack justifyContent={'space-evenly'} my={5} flexWrap={"wrap"} >

            <StatCard colorscheme="blue" title="Total Listings" listings={totalListingCount} icon={<FiList />} />
            <StatCard colorscheme="green" title="Active Listings" listings={activeListingCount} icon={<FaCheckCircle />} />
            <StatCard colorscheme="red" title="Total Fundings" listings={`Rs ${Number(totalFundingAmount).toLocaleString('en-IN')}`} icon={<MdDelete />} />



          </HStack>
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
                    {investee?.businessName}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Email
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investee?.email}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Phone Number:
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investee?.phoneNumber}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Location
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investee?.address}, {investee?.zipcode}, {investee?.city}, {investee?.country}
                  </Text>
                </Box>
              </Stack>
            </CardBody>

            <CardFooter>
              <ButtonGroup spacing='2'>
                {/* <Button variant='solid' colorScheme='blue' onClick={() => openEditModal(investee)}>
                Edit Profile
              </Button> */}
              </ButtonGroup>
            </CardFooter>
          </Card>
        </>)}

        {/* <Modal onClose={onFirstModalClose} isOpen={isFirstModalOpen} isCentered>
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
                onKeyDown={(event) => checkIfNumber(event)}
                onChange={(event) => handleInputChange(event, setZipcode)}
              />
              
               <Text fontSize='sm' marginTop={"3px"}>Note: During verification if your details are incorrect then your account may got deleted. So, kindly enter correct information.</Text>
            <Button
              colorScheme="teal"
              variant="solid"
              marginTop={"30px"}
              size={{ base: "md", md: "md", lg: "lg" }}
              onClick={() => {updateProfile()}}
            >
              Update
            </Button>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onFirstModalClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
      </Sidebar>
    </>
  )
}
const StatCard = (props) => {
  return <Card
    direction={'column'}
    overflow='hidden'
    variant='outline'
    backgroundColor={`${props.colorscheme}.50`}
    borderColor={props.colorscheme}
    colorScheme={props.colorscheme}
    padding={4}
    minW={'24%'}
  >
    <HStack justifyContent={'space-between'} width={'100%'} >
      <Text>{props.title}</Text>
      <Button colorScheme={props.colorscheme}>
        {props.icon}
      </Button>
    </HStack>
    <HStack>
      <Heading>{props.listings}</Heading>
    </HStack>
    {/* <HStack mt={2}>
    <Badge colorScheme={props.colorscheme} p={1} >{props.recordsCount} records</Badge>
  </HStack> */}

  </Card>
}

export default Investeedashboardhome