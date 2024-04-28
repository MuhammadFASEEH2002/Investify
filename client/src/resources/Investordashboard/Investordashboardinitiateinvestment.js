import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { Button, Checkbox, Spinner, Stack, Flex, Heading, Text, useToast } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

const content = [
  {
    heading: "1. Investment Amount",
    text: "The investor agrees to provide the specified investment amount to the investee as agreed upon in the investment agreement.",
  },
  {
    heading: "2. Revenue Sharing",
    text: "The investor understands that returns on investment will be based on a revenue-sharing model, where a certain percentage of the business profits will be shared for a limited period as per the agreed terms.",
  },
  {
    heading: "3. Confidentiality",
    text: "The investor agrees to maintain confidentiality regarding any sensitive information disclosed by the investee during the process.",
  },
  {
    heading: "4. Due Diligence",
    text: "The investor acknowledges the importance of conducting due diligence on the investee's business before making any investment decisions.",
  },
];


const Investordashboardinitiateinvestment = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [checkbox, setCheckbox] = useState(false);
  const { id } = useParams();

  const handleCheckboxChange = (event, setState) => {
    setState(event.target.checked);
  };

  const makePayment = async () => {
    setLoading(true)
    if (checkbox) {
      const token1 = window.localStorage.getItem('token1');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/checkout-session`, {
        method: "POST",
        body: JSON.stringify({
          checkbox
        }),
        headers: {
          "id": id,
          'token': token1,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            if (res.session.url) {
              window.location.href = res.session.url
            }
          } else {
            setLoading(false)
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast({
        title: "Agreement not signed",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setLoading(false)
    }

  }

  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-investment-initiation";

    } else {
      navigate("/user-login");
    }
  }, []);
  return (
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
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Stack

            width={50}
            height={50}
            backgroundSize={"100% 100%"}
            backgroundImage="url('/images/terms-conditions.png')"
            marginBottom={{ base: 10, md: 0, lg: 0 }}
          ></Stack>
          <Flex
            justify="center">

            <Heading size='lg' color={'gray.700'} justify="center" >
              Terms and Conditions
            </Heading>
          </Flex>
          {/* <Flex align="center"
            justify="center">

            <Stack spacing={2}
              //fontFamily="Arial, sans-serif"
              fontFamily="TT Hoves Pro, sans-serif"
            >

              <Stack>
                <Heading size='md' color={'gray.700'} justify="center" >
                  1. Investment Amount
                </Heading>
                <Text
                  color={"gray.800"}
                  fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
                  textAlign={"justify"}
                >
                  The investor agrees to provide the specified investment amount
                  to the investee as agreed upon in the investment agreement.
                </Text>
              </Stack>

              <Stack>
                <Heading size='md' color={'gray.700'} justify="center" >
                  2. Revenue Sharing
                </Heading>
                <Text
                  color={"gray.800"}
                  fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
                  textAlign={"justify"}
                >
                  The investor understands that returns on investment will be based on a revenue-sharing model,
                  where a certain percentage of the business profits will be shared for a limited period as per the agreed terms.
                </Text>
              </Stack>

              <Stack>
                <Heading size='md' color={'gray.700'} justify="center" >
                  3.	Confidentiality
                </Heading>
                <Text
                  color={"gray.800"}
                  fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
                  textAlign={"justify"}
                >
                  The investor agrees to maintain confidentiality regarding
                  any sensitive information disclosed by the investee during the process.
                </Text>
              </Stack>

              <Stack>
                <Heading size='md' color={'gray.700'} justify="center" >
                  4. Due Diligence
                </Heading>
                <Text
                  color={"gray.800"}
                  fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
                  textAlign={"justify"}
                >
                  The investor acknowledges the importance of conducting due diligence
                  on the investee's business before making any investment decisions.
                </Text>
              </Stack>
            </Stack>
          </Flex> */}
          <Flex align="center" justify="center">
            <Stack spacing={2} fontFamily="TT Hoves Pro, sans-serif">
              {content.map((item, index) => (
                <Stack key={index}>
                  <Heading size="sm" color={"gray.700"} justify="center">
                    {item.heading}
                  </Heading>
                  <Text
                    color={"gray.800"}
                    fontSize={{ base: "0.6rem", md: "0.8rem", lg: "1rem" }}
                    textAlign={"justify"}
                  >
                    {item.text}
                  </Text>
                </Stack>
              ))}
            </Stack>
          </Flex>
          <Checkbox colorScheme='blue' onChange={(event) => handleCheckboxChange(event, setCheckbox)}
            checked={setCheckbox}>I accept all the investment terms and conditions</Checkbox>
          <Button colorScheme='blue'
            onClick={() => { makePayment() }}>
            <Link to={``}>
              Proceed to Payment
            </Link>
          </Button>
        </Stack>
      </>)}
    </Sidebar>
  )
}

export default Investordashboardinitiateinvestment