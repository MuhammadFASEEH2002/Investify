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
  updateDoc
} from "firebase/firestore";
import useInvestee from '../../providers/investeeStore';


const Investeedashboardchat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { id1, id2 } = useParams();
  const navigate = useNavigate();
  const messagesRef = collection(db, "messages");
  const investee = useInvestee((state) => state?.investees)
  const chatContainerRef = useRef(null);
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

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

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
        <Box p={4} borderWidth="1px" borderRadius="lg" backgroundColor={"white"}>
          <Box height="300px" overflowY="scroll" p={4} borderWidth="1px" borderRadius="lg" ref={chatContainerRef} backgroundColor={""}>
            {/* Chat messages */}
            {messages.map((message) => (
              <Text textAlign={message?.userId == id2 ? "right" : "left"} padding={2}> <span style={{ padding: "8px", borderRadius: "10px", backgroundColor: message?.userId == id2 ? "#0096FF" : "#89CFF0" }}>{message.userId == id2 ? `${message?.text}` : `${message?.userName}: ${message?.text}`}</span></Text>
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


export default Investeedashboardchat;