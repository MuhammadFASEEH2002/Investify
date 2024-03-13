import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Button } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../utils/firebase';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';

const Investordashboardallchats = () => {
  const messagesRef = collection(db, 'messages');
  const [roomIdsArray, setRoomIdsArray] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = 'Investify | Investor-All-Chats';

      const queryMessages = query(messagesRef, orderBy('roomId'));

      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
        const distinctRoomIds = new Set();
        snapshot.forEach((doc) => {
          const { roomId } = doc.data();
          distinctRoomIds.add(roomId);
        });
        const roomIds = Array.from(distinctRoomIds);
        setRoomIdsArray(roomIds);
      });

      return () => {
        unsubscribe();
      };
    } else {
      navigate('/user-login');
    }
  }, []);

  const navigate = useNavigate();

  return (
    <Sidebar>
      {/* <Button
        colorScheme="blue"
        variant="outline"
        onClick={() => {
          navigate(`/user/investor-dashboard/chat/65db9d4244a6ce94f3230e05/65da5210cda880d24b79f024`);
        }}
      >
        Chat
      </Button> */}
      {roomIdsArray.map((roomId) => (
        <Button
          key={roomId}
          colorScheme="blue"
          variant="outline"
          onClick={() => {
            navigate(`/user/investor-dashboard/chat/${roomId.split('_')[0]}/${roomId.split('_')[1]}`);
          }}
        >
          {roomId}
        </Button>
      ))}
    </Sidebar>
  );
};

export default Investordashboardallchats;