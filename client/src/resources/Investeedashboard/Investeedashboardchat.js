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
import useInvestee from '../../providers/investeeStore';

const Investeedashboardchat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  const messagesRef = collection(db, "messages");
  const investee = useInvestee((state) => state?.investees)

  const roomId = `${id1}_${id2}`;


  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      document.title = 'Investify | Investee-chat';
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
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      userId: id2,
      userName: investee?.businessName,
      roomId,
    });

    setNewMessage("");
  };


  return (
    <>
      <Sidebar>
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <Box height="300px" overflowY="scroll" p={4} borderWidth="1px" borderRadius="lg">
            {/* Chat messages */}
            {messages.map((message) => (
              <Text textAlign={message.userId == id2 ? "right" : "left"} padding={10}>{message.text}</Text>
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


export default Investeedashboardchat;