import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import useInvestee from '../../providers/investeeStore';
import { socket } from '../../utils/socket';



const Investeedashboardchat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [userStatus, setUserStatus] = useState(false);


  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  // const messagesRef = collection(db, "messages");
  const investee = useInvestee((state) => state?.investees)
  const chatContainerRef = useRef(null)
  const roomId = `${id1}_${id2}`

  const getMessages = () => {
    try {
      const token = window.localStorage.getItem('token');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/chat/investee/get-messages/${roomId}`, {
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
            // console.log(res.chatUser)
            // setUser2(res.chatUser);
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
      const token = window.localStorage.getItem('token');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/chat/investee/send-message`, {
        method: "POST",
        body: JSON.stringify({
          newMessage,
          roomId
        }),
        headers: {
          'token': token,
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
    if (window.localStorage.getItem('token')) {
      document.title = 'Investify | Investee-chat';
      getMessages()
      socket.connect()
      socket.on('connect', console.log);
      socket.on('disconnect', console.log);
      socket.on(`${roomId}-new-message`, (message) => {
        console.log('new message', message);
        setMessages((prev) => [...prev, JSON.parse(message)])
      });

      return () => {
        socket.off('connect', console.log);
        socket.off('disconnect', console.log);
      };
  

    } else {
      navigate('/user-login');
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);



  return (
    <>
      <Sidebar>
        <Box p={4} borderWidth="1px" borderRadius="lg" backgroundColor={"white"}>
          <Box marginLeft={5}>
          {/* <Text>{name}</Text>
            {userStatus ? <Text color={"green"}>online</Text> : <Text color={"red"}>offline</Text>} */}
          </Box>
          <Box height="300px" overflowY="scroll" p={6} borderWidth="1px" borderRadius="lg" ref={chatContainerRef} backgroundColor={""}>
            {/* Chat messages */}
            {messages.map((message) => (
              <Text textAlign={message?.investee_id?._id == id2 ? "right" : "left"} padding={2}> <span style={{ padding: "8px", borderRadius: "10px", backgroundColor: message?.investee_id?._id  == id2 ? "#0096FF" : "#89CFF0",color: message?.investee_id?._id  == id2 ? "white" : "black" }}>{message?.investee_id?._id == id2 ? `${message?.message}` : `${message?.message}`}</span></Text>
            ))}
          </Box>
          <Input
            placeholder="Enter message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage()

              }
            }}
          />
          <Button colorScheme="blue" mt={4} onClick={() => {      sendMessage()
 }}
          >
            Send
          </Button>
        </Box>
      </Sidebar>
    </>
  );
};


export default Investeedashboardchat;