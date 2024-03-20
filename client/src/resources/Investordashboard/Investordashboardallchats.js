import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import {  Stack, Spinner, Text , Card, CardBody} from '@chakra-ui/react';
import {  useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate()


  useEffect(() => {
    if (window.localStorage.getItem('token1')) {
      document.title = 'Investify | Investor-All-Chats';

      const queryMessages = query(messagesRef, orderBy('roomId'));

      setLoading(true);
      const unsubscribe = onSnapshot(queryMessages, (snapshot) => {

        const distinctRoomIds = new Set();
        snapshot.forEach((doc) => {
          const { roomId } = doc.data();
          if (roomId.split('_')[0] == investor?._id || roomId.split('_')[1] == investor?._id) {
            distinctRoomIds.add(roomId);
          } else {
            console.log('not same')
          }

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
        {roomIdsArray.length > 0 ? (<>
          <>
                        <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Stack width={{ base: "100%", md: "80%", lg: "70%" }} flexDirection={"column"}>
                                {roomIdsArray.map((roomId, index) => (
                                    <Card onClick={() => {
                                      navigate(`/user/investor-dashboard/chat/${roomId.split('_')[0]}/${roomId.split('_')[1]}`);
                                    }} cursor={"pointer"} key={roomId} width={"100%"}>
                                        <CardBody>
                                            <Text fontSize={"1em"}>chat {index + 1}</Text>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Stack>
                        </Stack>
                    </>
        
        </>) : (<>No Chats</>)}


      </>)}
    </Sidebar>
  );
};

export default Investordashboardallchats;