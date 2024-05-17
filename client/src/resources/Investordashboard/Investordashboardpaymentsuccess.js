import { Stack, Card, CardHeader, CardBody, CardFooter, Text, Heading, Button, useToast, Spinner } from '@chakra-ui/react'
import { FaCircleCheck } from "react-icons/fa6";
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Investordashboardpaymentsuccess = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true)

  const paymentSuccess = async () => {
    setLoading(true)
    console.log(sessionId)
    if (sessionId) {
      const token1 = window.localStorage.getItem('token1');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/payment-success`, {
        method: "POST",
        body: JSON.stringify({
          sessionId
        }),
        headers: {
          'token': token1,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            console.log("pay success")
            investmentAgreement(res?.listing?._id)

          } else {
            setLoading(false)
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast({
        title: "Cannot get Session Id",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      setLoading(false)
    }
  }
  const investmentAgreement = async (listingId) => {

      const token1 = window.localStorage.getItem('token1');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/investment-agreement`, {
        method: "POST",
        body: JSON.stringify({
          listingId
        }),
        headers: {
          'token': token1,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            setLoading(false)


          } else {
            setLoading(false)
          }
        })
        .catch((err) => console.log(err));
    
  }
  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-Payment-Success";
      paymentSuccess()
    } else {
      navigate("/user-login");
    }
  }, [])
  return (
    <Stack alignItems={"center"} jusitfyContent={"center"} height={"100vh"} width={"100vw"} backgroundColor={"#EAEDEF"}>
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
        <Card size="lg" marginTop={10} border={"0.8px blue"}>
          <CardHeader alignItems={"center"} justifyContent={"center"} display={"flex"}>
            <FaCircleCheck color='#00bfff' size={"4em"} />
          </CardHeader>
          <CardBody>
            <Heading textAlign={"center"}>Thank You</Heading>
            <Text textAlign={"center"}>Payment Successful</Text>
          </CardBody>
          <CardFooter>
            <Button colorScheme='blue' onClick={() => { navigate("/user/investor-dashboard/home") }}>Return to Dashboard</Button>
          </CardFooter>
        </Card>
      </>)}
    </Stack>
  )
}

export default Investordashboardpaymentsuccess