import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Button, Stack, Spinner, Text } from '@chakra-ui/react';
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
import useInvestor from '../../providers/investorStore';

const Investordashboardallchats = () => {
  const messagesRef = collection(db, 'messages');
  const [roomIdsArray, setRoomIdsArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const investor = useInvestor((state) => state?.investors)
const navigate=useNavigate()
  

  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = 'Investify | Investor-All-Chats';
  
      const queryMessages = query(messagesRef, orderBy('roomId'));
  
      setLoading(true);
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
  
        const distinctRoomIds = new Set();
        snapshot.forEach((doc) => {
          const { roomId } = doc.data();
          distinctRoomIds.add(roomId);
        });
        const roomIds = Array.from(distinctRoomIds);
        setRoomIdsArray(roomIds);
  
        setLoading(false);
      });
      console.log(investor);
      return () => {
        unsubscribe();
      };
    } else {
      navigate('/user-login');
    }
  }, []);


  return (
    <Sidebar>
      {loading ? (<>
        <><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>
      </>) : (<>
        {roomIdsArray.map((roomId) => (
          <>
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
          <p>
            Testing Zustand: {investor._id}
          </p>
          </>
        ))}

      </>)}
    </Sidebar>
  );
};

export default Investordashboardallchats;