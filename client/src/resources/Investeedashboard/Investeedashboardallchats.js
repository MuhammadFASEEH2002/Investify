import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Stack, Spinner, Card, CardBody, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../utils/firebase';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';
import useInvestee from '../../providers/investeeStore';


const Investeedashboardallchats = () => {
    const messagesRef = collection(db, 'messages');
    const [roomIdsArray, setRoomIdsArray] = useState([]);
    const [loading, setLoading] = useState(false);
    const investee = useInvestee((state) => state?.investees);
    const navigate = useNavigate();
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            document.title = 'Investify | Investor-All-Chats';
            if (investee?._id) {
                console.log(investee?._id);
                const queryMessages = query(messagesRef, orderBy('roomId'));
                setLoading(true);
                console.log(queryMessages)
                const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
                    const distinctRoomIds = new Set();
                    snapshot.forEach((doc) => {
                        const { roomId, userName } = doc.data();
                        if (roomId.split('_')[0] == investee?._id || roomId.split('_')[1] == investee?._id) {
                            if (userName != investee?.businessName) {
                                // distinctRoomIds.add({ roomId, userName });
                                const uniqueIdentifier = `${roomId}-${userName}`; // Combine roomId and userName
                                distinctRoomIds.add(uniqueIdentifier);
                            }
                        } else {
                            console.log('not same')
                        }
                    });
                    const roomIds = Array.from(distinctRoomIds);
                    console.log(roomIds);
                    setRoomIdsArray(roomIds);
                    setLoading(false);
                });
                return () => {
                    unsubscribe();
                };
            } else {
                console.log('no investee');
            }
        } else {
            navigate('/user-login');
        }
    }, []);


    return (
        <Sidebar>
            {loading ? (<>
                <><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>
            </>) : (<>
                {roomIdsArray.length > 0 ? (
                    <>
                        <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Stack width={{ base: "100%", md: "80%", lg: "70%" }} flexDirection={"column"}>
                                {roomIdsArray.map((room, index) => (
                                    <Card onClick={() => {
                                        navigate(`/user/investee-dashboard/chat/${room?.split('-')[0].split('_')[0]}/${room?.split('-')[0].split('_')[1]}`);
                                    }} cursor={"pointer"} key={room} width={"100%"}>
                                        <CardBody>
                                            <Text fontSize={"1em"}>chat {index + 1}: {room.split('-')[1]} </Text>
                                        </CardBody>
                                    </Card>
                                ))}
                            </Stack>
                        </Stack>
                    </>
                ) : (<>No Chats</>)}
            </>)}
        </Sidebar>
    );
};

export default Investeedashboardallchats;