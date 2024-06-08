import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import {
  Card, CardHeader, CardBody, Heading, Box, Stack, StackDivider, Text, Button,
  useToast,
  Spinner,
  Badge, HStack
} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { IoGrid } from 'react-icons/io5';
import { IoIosNotifications } from "react-icons/io";
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

const Investordashboardhome = () => {

  const [investor, setInvestor] = useState([]);

  const [loading, setLoading] = useState(false);
  const [totalNotifications, setTotalNotifications] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const messagesRef = collection(db, 'messages');




  const toast = useToast();
  const navigate = useNavigate();
  const getUser = () => {
    setLoading(true)
    const token = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/get-user`, {
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
          setInvestor(res.investor)
          // updateStatus(res.investor._id)

          setLoading(false)

        } else {
          toast({
            title: "Network Error",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          navigate("/")
        }
      })
      .catch((err) => console.log(err));
  };
  const getStats = () => {
    setLoading(true)

    const token = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/get-stats`, {
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
          // setTotalListingCount(res.TotalListingCount)
          // setActiveListingCount(res.ActiveListingCount)
          setTotalAmount(res.totalAmount)
          setTotalNotifications(res.TotalNotifications)
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
  // const updateStatus = async (investorID) => {
  //   console.log(investorID)
  //   const queryMessages = query(
  //     messagesRef,
  //     where("userId", "==", investorID)
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
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-Home";
      getUser();
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
          <HStack justifyContent={'space-evenly'} my={5} flexWrap={"wrap"}>

            {/* <StatCard colorscheme="blue" title="Notifications" listings={totalNotifications} icon={<IoIosNotifications />} /> */}
            <StatCard colorscheme="red" title="Total Amount Invested" listings={`Rs ${Number(totalAmount).toLocaleString()}`} icon={<IoIosNotifications />} />
            {/* <Text>Rs {Number(listing?.profit.profitAmount).toLocaleString('en-IN')}</Text> */}


          </HStack>
          <Card >
            <CardHeader>
              <Heading size='md'>Investor Profile</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Full Name
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investor?.firstName} {investor?.lastName}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Email
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investor?.email}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Phone Number:
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investor?.phoneNumber}
                  </Text>
                </Box>
                <Box>
                  <Heading size='xs' textTransform='uppercase'>
                    Location
                  </Heading>
                  <Text pt='2' fontSize='sm'>
                    {investor?.city}, {investor?.country}
                  </Text>
                </Box>
              </Stack>
            </CardBody>

          </Card>
        </>)}

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
export default Investordashboardhome