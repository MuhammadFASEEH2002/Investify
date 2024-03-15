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
import useInvestee from '../../providers/investeeStore';


const Investeedashboardallchats = () => {
    const messagesRef = collection(db, 'messages');
    const [roomIdsArray, setRoomIdsArray] = useState([]);
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
                        console.log(roomId.split('_'))
                        if(roomId.split('_')[0]==investee?._id || roomId.split('_')[1]==investee?._id){
                            distinctRoomIds.add(roomId);
                        }else{
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
            {roomIdsArray.map((roomId) => (
                <>
                    <Button
                        key={roomId}
                        colorScheme="blue"
                        variant="outline"
                        onClick={() => {
                            navigate(`/user/investee-dashboard/chat/${roomId.split('_')[0]}/${roomId.split('_')[1]}`);
                        }}
                    >
                        {roomId}
                    </Button>
                </>
            ))}
            <p>

                testing zustand :{investee?._id}
            </p>
        </Sidebar>
    );
};

export default Investeedashboardallchats;