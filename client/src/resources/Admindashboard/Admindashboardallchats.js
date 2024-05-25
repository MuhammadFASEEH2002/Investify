import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Stack, Spinner, Card, CardBody, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useInvestee from '../../providers/investeeStore';


const Admindashboardallchats = () => {
    // const messagesRef = collection(db, 'messages');
    const [messages, setMessages] = useState([]);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const investee = useInvestee((state) => state?.investees);
    const navigate = useNavigate();

    const getMessages = () => {
        try {
            setLoading(true)
            const token = window.localStorage.getItem('adminToken');
            fetch(`${process.env.REACT_APP_FETCH_URL_}/api/chat/admin/get-all-chats`, {
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
                        // setMessages(res.message)
                        getChats(res.message)
                        setLoading(false)
                     
                    }
                    else {
                        console.log("error")
                        setLoading(false)

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
            if (message.chat_id.split('_')[0] === '65d88f93e5d99c47ee8df0dd' || message.chat_id.split('_')[1] === '65d88f93e5d99c47ee8df0dd') {
                let chatId = message.chat_id;
                let chatName = '';
              
                if (message.investor_id) {
                  if (message.investor_id.firstName && message.investor_id.lastName) {
                    chatName = `${message.investor_id.firstName} ${message.investor_id.lastName}`;
                  }
                } else if (message.investee_id && message.investee_id.businessName) {
                  chatName = message.investee_id.businessName;
                }
              
                if (chatName) {
                  let uniqueIdentifier = `${chatId}-${chatName}`;
                  distinctChats.add(uniqueIdentifier);
                }
              }

        });
        // console.log(distinctChats)
        const chatHeads = Array.from(distinctChats);
                // console.log(chatHeads);
                setChats(chatHeads);
                // console.log(chats)
    }
    useEffect(() => {
        if (window.localStorage.getItem('adminToken')) {
            document.title = 'Investify | Admin-All-Support-Chats';
            // console.log(investee?._id);
            getMessages();

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
                                        navigate(`/admin/admin-dashboard/chat-support/${chat?.split('-')[0].split('_')[0]}/${chat?.split('-')[0].split('_')[1]}`);
                                    }} cursor={"pointer"} key={index} width={"100%"}>
                                        <CardBody>
                                            <Text fontSize={"1em"}>{chat.split('-')[1]} </Text>
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

export default Admindashboardallchats;