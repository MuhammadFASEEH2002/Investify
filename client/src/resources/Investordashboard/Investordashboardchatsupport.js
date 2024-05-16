import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import { socket } from '../../utils/socket';
import { useNavigate, useParams } from 'react-router-dom';


const Investordashboardchatsupport = () => {
  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const roomId = `${id1}_${id2}`;

  const getMessages = () => {
    try {
      const token1 = window.localStorage.getItem('token1');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/chat/investor/chat-support/get-messages/${roomId}`, {
        method: "GET",
        headers: {
          'token': token1,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            setMessages(res.message)
          }
          else {
            console.log("error")
          }
        })
        .catch((err) => console.log(err));

    } catch (error) {
      console.log(error)
    }
  }
  const sendMessage = () => {
    try {
      const token1 = window.localStorage.getItem('token1');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/chat/investor/chat-support/send-message`, {
        method: "POST",
        body: JSON.stringify({
          newMessage,
          roomId
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
            console.log("message sent")
            setNewMessage('')
            // getMessages()
          }
          else {
            console.log("error")
          }
        })
        .catch((err) => console.log(err));

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const token = window.localStorage.getItem('token1');
    const handleNewMessage = (message) => {
      console.log('new message', message);
      setMessages((prev) => [...prev, JSON.parse(message)]);
    };

    if (token) {
      document.title = 'Investify | Investor-Chat Support';
      getMessages();
      socket.connect();
      socket.on('connect', console.log);
      socket.on('disconnect', console.log);
      socket.on(`${roomId}-new-message`, handleNewMessage);
    } else {
      navigate('/user-login');
    }

    return () => {
      socket.off(`${roomId}-new-message`, handleNewMessage);
      socket.off('connect', console.log);
      socket.off('disconnect', console.log);
    };
  }, []);

  return (
    <>
      <Sidebar>
        <Box p={4} borderWidth="1px" borderRadius="lg" bgColor={"white"}>
          <Box marginLeft={5}>
            <Text color={"green"}> Chat Support</Text>
          </Box>
          <Box height="300px" overflowY="scroll" p={6} borderWidth="1px" borderRadius="lg" ref={chatContainerRef} backgroundColor={""}>
            {messages.map((message) => (
              <Text textAlign={message?.investor_id?._id == id2 ? "right" : "left"} padding={2}> <span style={{ padding: "8px", borderRadius: "10px", backgroundColor: message?.investor_id?._id == id2 ? "#0096FF" : "#89CFF0", color: message?.investor_id?._id == id2 ? "white" : "black" }}>{message?.investor_id?._id == id2 ? `${message?.message}` : ` ${message?.message}`}</span></Text>
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

export default Investordashboardchatsupport;
