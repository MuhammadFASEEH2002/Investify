import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Tr, Td, Switch, FormControl, Card, HStack, Text, Button, Heading, Stack, Spinner, Modal, ModalOverlay, ModalCloseButton, ModalBody, ModalContent, ModalHeader, VStack, Input, InputGroup, InputRightElement, ModalFooter, InputLeftAddon } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import JTable from './components/JTable';
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../utils/firebase";

const Admindashboardinvestments = () => {
  const [investment, setInvestment] = useState([]);
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('adminToken')) {
      document.title = "Investify | Admin - All Investments";
      getInvestment();
    } else {
      navigate("/admin-login");
    }
  }, []);
  const getInvestment = () => {
    setLoading(true)
    const admintoken = window.localStorage.getItem('adminToken');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-investments`, {
      method: "GET",
      headers: {
        'token': admintoken,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setInvestment(res.investments)
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
          {investment.length > 0 ? (
            <>
              <JTable
                tableData={investment}
                tableHeads={['Business Name', 'Amount Given', 'Investment Duration', 'Profit Share Percentage', 'Investment Start Date', 'Investment End Date', 'Investment Status', 'Profit Status']}

                tableRender={(index, investment) => {
                  return <Row key={index} investment={investment} />;
                }}
                bg='white'
              />

            </>
          ) : (
            <p>No investments found.</p>
          )}
        </>)}

      </Sidebar>
    </>
  )
}

const Row = ({ investment }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState(null);
  const toast = useToast()
  // const navigate = useNavigate();
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [totalProfit, setTotalProfit] = useState('');
  const [profitToGive, setProfitToGive] = useState('');
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);


  const handleProfitChange = (event) => {
    const profit = event.target.value;
    setTotalProfit(profit);
    const calculatedProfit = profit ? (parseFloat(profit) * 0.05).toFixed(2) : '';
    setProfitToGive(calculatedProfit);
  };
  const onOpen = () => {
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };

  async function payProfits(investment) {
    const token = window.localStorage.getItem('adminToken');

    if (
      file &&
      totalProfit &&
      profitToGive
    ) {
      setLoading(true)
      // console.log(formData)
      // if (!emailRegex.test(email)) {

      //   toast({
      //     title: "Invalid Email Address Format",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //     position: "top",
      //   });
      //   setLoading(false)
      //   return
      // }
      // if (!cnicRegex.test(cnic)) {
      //   toast({
      //     title: "Invalid Format of CNIC or not in 13 digits",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //     position: "top",
      //   });
      //   setLoading(false)
      //   return
      // }
      // if (!phoneNumberRegex.test(phoneNumber)) {
      //   toast({
      //     title: "Invalid Phone Number",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //     position: "top",
      //   });
      //   setLoading(false)

      //   return
      // }
      // if (!zipcodeRegex.test(zipcode)) {
      //   toast({
      //     title: "Invalid Zipcode.",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //     position: "top",
      //   });
      //   setLoading(false)

      //   return
      // }
      // if (!businessNameRegex.test(businessName)) {
      //   toast({
      //     title: "Inappropriate name for a business",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //     position: "top",
      //   });
      //   setLoading(false)

      //   return
      // }
      // if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
      //   toast({
      //     title: "Password should have minimum 8 characters. No spaces allowed and at least 1 alphabet or letter is compulsory",
      //     status: "error",
      //     duration: 9000,
      //     isClosable: true,
      //     position: "top",
      //   });
      //   setLoading(false)

      //   return
      // }

      const fileRef = ref(storage, `upload/profit_verification_docs/${Date.now() + file.name}`);
      // formData.append('fileRef', url);
      await uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrl(url)
          fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/pay-profits`, {
            method: "POST",
            body: JSON.stringify({
              url, profitToGive, totalProfit, investment
            }),
            headers: {
              'token': token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              if (res.status) {

              }
            })
            .catch((err) => console.log(err));
        });

      });

    } else {
      toast({
        title: "Fields Are Empty",
        description: "Kindly fill all the fields with correct data",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setLoading(false)

    }
  };
  return (
    <>
      <Tr
        _hover={{
          backgroundColor: 'gray.100',
          cursor: 'pointer'
        }}
      >
        <Td style={{ fontWeight: 'bold' }} color={"blue"}><Link to={`/admin/admin-dashboard/investment-detail/${investment?._id}`} >{investment?.investee_id?.businessName}</Link></Td>
        <Td>Rs {investment?.amount ? Number(investment.amount).toLocaleString('en-IN') : 'N/A'} /- </Td>


        <Td>{investment?.investmentDuration} years </Td>
        <Td>{investment?.profitPercentage} % </Td>
        <Td>{investment?.investment_start_date} </Td>
        <Td>{investment?.investment_end_date}  </Td>

        <Td>{investment?.isInvestmentEnded ? 'Ended' : 'Not Ended'}</Td>
        {investment?.isInvestmentEnded && (
          <Td>
            <Button onClick={() => onOpen()} colorScheme="teal" variant="solid">
              pay profits
            </Button>
          </Td>
        )}


      </Tr>
      <Modal onClose={onClose} isOpen={isModalOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <VStack alignItems={"flex-start"}>
              <Text>Enter Total Profits from {investment?.investment_start_date} till {investment?.investment_end_date}</Text>
              <HStack>
                <InputGroup>
                  <InputLeftAddon>Rs</InputLeftAddon>
                  <Input
                    type="number"
                    placeholder="Enter Total Profits Here"
                    variant={"filled"}
                    // border={"0.5px solid grey"}
                    value={totalProfit}
                    onChange={handleProfitChange}
                  />
                </InputGroup>
              </HStack>
              <Text>Profit to be Given</Text>
              <HStack>
                <Input
                  type="text"
                  variant={"filled"}
                  // border={"0.5px solid grey"}
                  readOnly={true}
                  value={profitToGive}
                />
                {/* <Button onClick={() => sendOtp()} colorScheme="teal" variant="solid">Get OTP</Button> */}

              </HStack>
              <Text>Upload Profits Account Statement (signed by auditor) </Text>
              <Input
                size="md"
                type="file"
                width={"90%"}
                accept=".pdf"
                onChange={handleFileChange}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => { payProfits(investment) }} colorScheme="teal" variant="solid">Pay<FaArrowRight /></Button>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </>)
}


export default Admindashboardinvestments