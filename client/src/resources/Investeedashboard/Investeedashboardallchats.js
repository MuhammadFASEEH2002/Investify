import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { Stack, Spinner, Card, CardBody, Text, Heading ,Flex,Box,Spacer} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
            setLoading(true)
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
                        setMessages(res.message)
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
    // const getChats = (messages) => {
    //     const distinctChats = new Set();
    //     messages.map((message) => {
    //         //    console.log(message)
    //         if (message.chat_id.split('_')[0] == investee?._id || message.chat_id.split('_')[1] == investee?._id) {
    //             // if (message.investor_id?.businessName !== investee?.businessName) {
    //             // console.log(message?.investor_id?.firstName)
    //             let chatId = message?.chat_id
    //             let chatName = `${message?.investor_id?.firstName} ${message?.investor_id?.lastName}`
    //             let chatTime = message?.createdAt
    //             let uniqueIdentifier = `${chatId}-${chatName}`
    //             distinctChats.add(uniqueIdentifier)


    //         }

    //     });
    //     // console.log(distinctChats)
    //     const chatHeads = Array.from(distinctChats);
    //     // console.log(chatHeads);
    //     setChats(chatHeads);
    //     // console.log(chats)
    // }
    const getChats = (messages) => {
        const distinctChats = new Map();

        messages.forEach((message) => {
            if (message.chat_id.split('_')[0] === investee?._id || message.chat_id.split('_')[1] === investee?._id) {
                let chatId = message?.chat_id;
                let chatName = `${message?.investor_id?.firstName} ${message?.investor_id?.lastName}`;
                let chatTime = message?.createdAt;
                let uniqueIdentifier = `${chatId}-${chatName}`;

                // If the uniqueIdentifier is not in the map or the current message is newer, update the map
                if (!distinctChats.has(uniqueIdentifier) || new Date(chatTime) > new Date(distinctChats.get(uniqueIdentifier).createdAt)) {
                    distinctChats.set(uniqueIdentifier, message);
                }
            }
        });

        // Convert the map values to an array of distinct messages
        const chatHeads = Array.from(distinctChats.values());
        setChats(chatHeads);
    };


    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            document.title = 'Investify | Investor-All-Chats';
            // console.log(investee?._id);
            getMessages();

        } else {
            navigate('/user-login');
        }
    }, []);


    return (
        <Sidebar>
            <Heading textAlign={"center"}>All Chats</Heading>

            {loading ? (<>
                <><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>
            </>) : (<>
                {chats.length > 0 ?
                    (
                        <>
                            <Stack width={"100%"} alignItems={"center"} justifyContent={"center"}>
                                <Stack width={{ base: "100%", md: "80%", lg: "70%" }} flexDirection={"column"}>
                                    {chats.map((chat, index) => (
                                        <Card
                                            onClick={() => {
                                                const chatIdParts = chat.chat_id.split('_');
                                                navigate(`/user/investee-dashboard/chat/${chatIdParts[0]}/${chatIdParts[1]}`);
                                            }}
                                            cursor="pointer"
                                            key={index}
                                            width="100%"
                                            mb={4}
                                            boxShadow="md"
                                            borderRadius="md"
                                            _hover={{ boxShadow: "lg", transform: "scale(1.02)", transition: "all 0.2s" }}
                                        >
                                            <CardBody>
                                                <Flex alignItems="center">
                                                    <Box>
                                                        <Text fontSize="1.2em" fontWeight="bold">
                                                            {`${chat.investor_id.firstName} ${chat.investor_id.lastName}`}
                                                        </Text>
                                                        {/* <Text color="gray.500" fontSize="0.9em">
                                                            {chat.investor_id.businessName || "No Business Name"}
                                                        </Text> */}
                                                    </Box>
                                                    <Spacer />
                                                    <Box textAlign="right">
                                                        <Text color="gray.400" fontSize="0.8em">
                                                            {new Date(chat.createdAt).toLocaleString()}
                                                        </Text>
                                                    </Box>
                                                </Flex>
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