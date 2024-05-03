import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Stack, Spinner, Card, CardBody, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
// import { db } from '../../utils/firebase';
// import {
//     collection,
//     onSnapshot,
//     query,
//     orderBy,
// } from 'firebase/firestore';
import useInvestee from '../../providers/investeeStore';


const Investeedashboardallchats = () => {
    // const messagesRef = collection(db, 'messages');
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);

    const [loading, setLoading] = useState(false);
    const investee = useInvestee((state) => state?.investees);
    const navigate = useNavigate();
    const getMessages = () => {
        try {
            const token = window.localStorage.getItem('token');
            fetch(`${process.env.REACT_APP_FETCH_URL_}/api/chat/investee/get-all-chats`, {
                method: "GET",
                headers: {
                    'token': token,
                    'Accept': "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status) {
                        // console.log(res.chatUser)
                        // setUser2(res.chatUser);
                        setMessages(res.message)
                        getChats(res.message)
                        // if(investee?._id) {
                       
                        // }
                    }
                    else {
                        console.log("error")
                    }
                })
                .catch((err) => console.log(err));

        } catch (error) {
            console.log(error)
        }
    }
    const getChats = (messages) => {
        const distinctChats = new Set();
        messages.map((message) => {
            //    console.log(message)
            if (message.chat_id.split('_')[0] == investee?._id || message.chat_id.split('_')[1] == investee?._id) {
                // if (message.investor_id?.businessName !== investee?.businessName) {
                    console.log(message?.investor_id?.firstName)
                    let chatId = message?.chat_id
                    let chatName = `${message?.investor_id?.firstName} ${message?.investor_id?.lastName}`
                    let uniqueIdentifier=`${chatId}-${chatName}`
                    distinctChats.add( uniqueIdentifier )
            

            }

        });
        console.log(distinctChats)
        const chatHeads = Array.from(distinctChats);
                // console.log(chatHeads);
                setChats(chatHeads);
                console.log(chats)
    }
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            document.title = 'Investify | Investor-All-Chats';
            console.log(investee?._id);
            getMessages();

            // const queryMessages = query(messagesRef, orderBy('roomId'));
            // setLoading(true);
            // console.log(queryMessages)
            // const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
            //     const distinctRoomIds = new Set();
            //     snapshot.forEach((doc) => {
            //         const { roomId, userName } = doc.data();
            //         if (roomId.split('_')[0] == investee?._id || roomId.split('_')[1] == investee?._id) {
            //             if (userName != investee?.businessName) {
            //                 // distinctRoomIds.add({ roomId, userName });
            //                 const uniqueIdentifier = `${roomId}-${userName}`; // Combine roomId and userName
            //                 distinctRoomIds.add(uniqueIdentifier);
            //             }
            //         } else {
            //             console.log('not same')
            //         }
            //     });
            //     const roomIds = Array.from(distinctRoomIds);
            //     console.log(roomIds);
            //     setRoomIdsArray(roomIds);
            //     setLoading(false);
            // });
            // return () => {
            //     unsubscribe();
            // };

        } else {
            navigate('/user-login');
        }
    }, []);


    return (
        <Sidebar>
            {loading ? (<>
                <><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>
            </>) : (<>
                {chats.length > 0 ? 
                (
                    <>
                        <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                            <Stack width={{ base: "100%", md: "80%", lg: "70%" }} flexDirection={"column"}>
                                {chats.map((chat,index) => (
                                    <Card onClick={() => {
                                        navigate(`/user/investee-dashboard/chat/${chat?.split('-')[0].split('_')[0]}/${chat?.split('-')[0].split('_')[1]}`);
                                    }} cursor={"pointer"} key={index} width={"100%"}>
                                        <CardBody>
                                            <Text fontSize={"1em"}>chat {index + 1}: {chat.split('-')[1]} </Text>
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