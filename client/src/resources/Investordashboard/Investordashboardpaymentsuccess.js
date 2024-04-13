import { Stack, Card, CardHeader, CardBody, CardFooter, Text, Heading, Button } from '@chakra-ui/react'
import { FaCircleCheck } from "react-icons/fa6";
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Investordashboardpaymentsuccess = () => {
  const navigate= useNavigate()
  return (
    <Stack alignItems={"center"} jusitfyContent={"center"} height={"100vh"} width={"100vw"} backgroundColor={"#EAEDEF"}>

      <Card size="lg" marginTop={10} border={"0.8px blue"}>
        <CardHeader alignItems={"center"} justifyContent={"center"} display={"flex"}>
        <FaCircleCheck  color='#00bfff' size={"4em"}/>
        </CardHeader>
        <CardBody>
          <Heading textAlign={"center"}>Thank You</Heading>
          <Text textAlign={"center"}>Payment Successful</Text>
        </CardBody>
        <CardFooter>
          <Button colorScheme='blue' onClick={()=>{navigate("/user/investor-dashboard/home")}}>Return to Dashboard</Button>
        </CardFooter>
      </Card>
    </Stack>
  )
}

export default Investordashboardpaymentsuccess