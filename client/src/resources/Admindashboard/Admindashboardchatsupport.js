import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';

const Admindashboardsupport = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);

  useEffect(() => {
   
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    setMessages([...messages, { text: newMessage, sender: 'Admin' }]);
    setNewMessage('');
  };

  return (
    <>
    <Sidebar>
    
    <Box p={4} borderWidth="1px" borderRadius="lg" bgColor={"white"}>
   
    <Box marginLeft={5}>
            <Text color={"green"}> Chat Support</Text>
    </Box>

      <Box height="300px" overflowY="scroll" p={6} borderWidth="1px" borderRadius="lg" ref={chatContainerRef} backgroundColor={""}>
        
        {messages.map((message, index) => (
          <Text key={index} textAlign={message.sender === 'Admin' ? 'right' : 'left'} padding={2}>
            <span style={{ padding: "8px", borderRadius: "10px", backgroundColor: message.sender === 'Admin' ? "#1241b3" : "#89CFF0", color: message.sender === 'Admin' ? "white" : "black" }}>
              {message.text}
            </span>
          </Text>
        ))}
      </Box>
      <Input
        placeholder="Enter message"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            sendMessage();
          }
        }}
      />
      <Button 
      bg="#051c54"
      _hover={{ bg: "#0e2866" }} 
      color={"white"}
      //colorScheme="blue" 
      mt={4} onClick={sendMessage}>
        Send
      </Button>
    </Box>
    </Sidebar>
    </>
  );
};

export default Admindashboardsupport;
