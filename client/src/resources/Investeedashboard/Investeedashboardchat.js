import React from 'react'
import Sidebar from "./components/Sidebar";
import { Card, CardBody, Text, HStack, Stack, VStack, Heading, Divider, Spinner, Button, CardFooter, useToast } from '@chakra-ui/react'

const io = require('socket.io-client');
const socket = io.connect(`${process.env.REACT_APP_SOCKET_URL_}`);

const Investeedashboardchat = () => {
  return (
    <>
    <Sidebar>
<Text>Hello</Text>
    </Sidebar>
    </>
 
 
  )
}

export default Investeedashboardchat