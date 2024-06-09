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
                    <Heading textAlign={"center"}>All Investments</Heading>

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
  const navigate = useNavigate();
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
    const profitPercentage = investment.profitPercentage;
    const calculatedProfit = profit ? (parseFloat(profit) * Number(profitPercentage)/100).toFixed(2) : '';
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
  
    // Define regex for numeric validation (allows integers and decimals)
    const numericRegex = /^[0-9]+(\.[0-9]+)?$/;
  
    // Check if file, totalProfit, and profitToGive are provided
    if (file && totalProfit && profitToGive) {
      // Validate that totalProfit and profitToGive match the numeric regex
      const isTotalProfitNumeric = numericRegex.test(totalProfit);
      const isProfitToGiveNumeric = numericRegex.test(profitToGive);
  
      if (!isTotalProfitNumeric || !isProfitToGiveNumeric) {
        toast({
          title: "Invalid Input",
          description: "Total Profit and Profit to Give must be numeric values.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      const fileRef = ref(storage, `upload/profit_verification_docs/${Date.now() + file.name}`);
  
      await uploadBytes(fileRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setUrl(url);
          fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/pay-profits`, {
            method: "POST",
            body: JSON.stringify({
              url,
              profitToGive: parseFloat(profitToGive),
              totalProfit: parseFloat(totalProfit),
              investment
            }),
            headers: {
              'token': token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.status) {
                // Handle success response if needed
                window.location.reload();

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
    }
  }
  
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
        <Td>
          {investment?.isInvestmentEnded ? (
            <>
              {investment?.profit ? (
                // Render something if profit exists, e.g., a message or the profit amount
                <div>Profit amount already given</div>
              ) : (
                <Button onClick={() => onOpen()} colorScheme="teal" variant="solid">
                  Pay Profits
                </Button>
              )}
            </>
          ) : (
            <div>Profit will be given after the investment period ends</div>
          )}
        </Td>





      </Tr >
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