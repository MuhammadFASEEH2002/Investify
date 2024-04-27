import React, { useEffect, useState, useRef } from 'react';
import { Box, Text, Input, Button } from '@chakra-ui/react';
import Sidebar from './components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../utils/firebase';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import useInvestor from '../../providers/investorStore';


const Investordashboardchat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  const messagesRef = collection(db, "messages");
  const investor = useInvestor((state) => state?.investors)
  const chatContainerRef = useRef(null);
  const roomId = `${id1}_${id2}`;
  const [userStatus, setUserStatus] = useState(false);
  const [name, setName] = useState('');


  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = 'Investify | Investor-chat';
      const queryMessages = query(
        messagesRef,
        where("roomId", "==", roomId),
        orderBy("createdAt")
      );
      const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
        let messages = [];
        snapshot.forEach((doc) => {
          messages.push({ ...doc.data(), id: doc.id });
        });
        // console.log(messages);
        setMessages(messages);
        const distinctName = new Set()
        const chatStatus = new Set()


        messages.map((message) => {
          if (message.userId == id2) {
            distinctName.add(message?.userName)
            chatStatus.add(message?.online)
            setName(distinctName)
            setUserStatus([...chatStatus][0])
            console.log(userStatus)

            // const name=messages
          }

        });
      });

      return () => unsuscribe();

    } else {
      navigate('/user-login');
    }
  }, []);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  const handleSubmit = async () => {
    if (investor?.firstName && investor?.lastName) {
      if (newMessage === "") return;
      await addDoc(messagesRef, {
        text: newMessage,
        createdAt: serverTimestamp(),
        userId: id1,
        userName: `${investor?.firstName} ${investor?.lastName}`,
        roomId,
      });
      setNewMessage("");
    }
  };


  return (
    <>
      <Sidebar>
        <Box p={4} borderWidth="1px" borderRadius="lg" bgColor={"white"}>
        <Box marginLeft={5}>
          <Text>{name}</Text>
            {userStatus ? <Text color={"green"}>online</Text> : <Text color={"red"}>offline</Text>}
          </Box>
          <Box height="300px" overflowY="scroll" p={6} borderWidth="1px" borderRadius="lg" ref={chatContainerRef} backgroundColor={""}>
            {/* Chat messages */}
            {messages.map((message) => (
              <Text textAlign={message.userId == id1 ? "right" : "left"} padding={2}> <span style={{ padding: "8px", borderRadius: "10px", backgroundColor: message?.userId == id1 ? "#0096FF" : "#89CFF0", color: message?.userId == id1 ? "white" : "black" }}>{message.userId == id1 ? `${message?.text}` : `${message?.userName}: ${message?.text}`}</span></Text>

            ))}
          </Box>
          <Input
            placeholder="Enter message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit()
              }
            }}
          />
          <Button colorScheme="blue" mt={4} onClick={() => { handleSubmit() }}
          
          >
            Send
          </Button>
        </Box>
      </Sidebar>
    </>
  );
};


export default Investordashboardchat;