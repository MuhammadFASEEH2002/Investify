import React, { useEffect, useState } from 'react';
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

  const roomId = `${id1}_${id2}`;


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
        console.log(messages);
        setMessages(messages);
      });

      return () => unsuscribe();

    } else {
      navigate('/user-login');
    }
  }, []);


  const handleSubmit = async () => {
    if(investor?.firstName && investor?.lastName){
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
          <Box height="300px" overflowY="scroll" p={4} borderWidth="" borderRadius="lg">
            {/* Chat messages */}
            {messages.map((message) => (
                       <Text textAlign={message.userId==id1?"right":"left"} padding={2}> <span style={{ padding: "8px", borderRadius:"10px", backgroundColor: message?.userId==id1?"#0096FF":"#89CFF0" }}>{message.text}</span></Text>

            ))}
          </Box>

          <Input
            placeholder="Enter message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <Button colorScheme="blue" mt={4} onClick={() => { handleSubmit() }}>
            Send
          </Button>
        </Box>
      </Sidebar>
    </>
  );
};


export default Investordashboardchat;