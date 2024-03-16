import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Button, Stack, Spinner } from '@chakra-ui/react';
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
                const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
                    const distinctRoomIds = new Set();
                    snapshot.forEach((doc) => {
                        const { roomId } = doc.data();

                        if (roomId.split('_')[0] == investee?._id || roomId.split('_')[1] == investee?._id) {
                            distinctRoomIds.add(roomId);
                        } else {
                            console.log('not same')
                        }

                    });
                    const roomIds = Array.from(distinctRoomIds);
                    setRoomIdsArray(roomIds);
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
                {roomIdsArray.length > 0 ? (<>
                    {roomIdsArray.map((roomId,index) => (
                        <>
                            <Button
                                key={roomId}
                                colorScheme="blue"
                                variant="outline"
                                onClick={() => {
                                    navigate(`/user/investee-dashboard/chat/${roomId.split('_')[0]}/${roomId.split('_')[1]}`);
                                }}
                            >
                                chat {index+1}
                            </Button>
                            <p>
                                {/* Testing Zustand: {investee?._id} */}
                            </p>
                        </>
                    ))}
                </>) : (<>No Chats</>)}
            </>)}
        </Sidebar>
    );
};

export default Investeedashboardallchats;