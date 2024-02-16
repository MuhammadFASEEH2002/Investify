import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, CardBody, Text, HStack, Stack, VStack, Heading, Divider, Spinner, Button , CardFooter} from '@chakra-ui/react'

const Investordashboardproductpage = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [listing, setListing] = useState("")
    const [loading, setLoading] = useState(false)
    function getProduct() {
        setLoading(true)
        const token1 = window.localStorage.getItem('token1');
        fetch("http://127.0.0.1:3001/api/investor/get-listing-view", {
            method: "GET",
            headers: {
                "id": id,
                'token': token1,
                'Accept': "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setListing(data.listing)
                setLoading(false)

            })
            .catch((err) => {
                console.log(err)
                setLoading(false)

            });
    }
    useEffect(() => {
        if (window.localStorage.getItem('token1')) {
            document.title = "Investify | Investor-Listing-View";
            getProduct();
        } else {
            navigate("/user-login");
        }
    }, []);
    return (
        <>
            <Sidebar>
                {loading ? (<>
                    <Stack alignItems={'center'} justifyContent={'center'}>
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Stack>
                </>) : (<>
                    <Card alignItems={"center"} justifyContent={"center"}>
                        <HStack width={"95%"} alignItems={"flex-start"} justifyContent={"center"}>
                            <Stack width={"60%"}>
                                <CardBody width={"100%"}>
                                    < Heading fontSize={"2xl"} color={"blue.400"}>
                                        Business Details
                                    </Heading>
                                    <Divider marginBottom={"10px"}/>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Business Name: </Text>
                                        <Text>{listing?.investee_id?.businessName}</Text>
                                    </HStack>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Business Category: </Text>
                                        <Text>{listing?.investee_id?.category}</Text>
                                    </HStack>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Description: </Text>
                                        <Text>{listing?.description}</Text>
                                    </HStack>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Investment Required: </Text>
                                        <Text>Rs {listing?.amount}</Text>
                                    </HStack>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Duration of Investment: </Text>
                                        <Text>{listing?.investmentDuration} years</Text>
                                    </HStack>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Profit Share: </Text>
                                        <Text>{listing?.profitPercentage}% of Quarterly Profits</Text>
                                    </HStack>
                                </CardBody>
                            </Stack>
                            <Stack width={"35%"}>
                                <CardBody width={"100%"}>
                                    < Heading fontSize={"2xl"} color={"blue.400"} >
                                        Investee Information
                                    </Heading>
                                    <Divider marginBottom={"10px"}/>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Contact Number: </Text>
                                        <Text>{listing?.investee_id?.phoneNumber}</Text>
                                    </HStack>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Email: </Text>
                                        <Text>{listing?.investee_id?.email}</Text>
                                    </HStack>
                                    <HStack justifyContent={"flex-start"} alignItems={"flex-start"}>
                                        <Text color={"blue.400"}>Location: </Text>
                                        <Text>{listing?.investee_id?.address}, {listing?.investee_id?.zipcode}, {listing?.investee_id?.city}, {listing?.investee_id?.country}</Text>
                                    </HStack>
                                    <Stack width={"100%"} justifyContent={"center"} alignItems={"center"} marginTop={"10px"}>
                                        <Button colorScheme='blue'>Chat</Button>
                                    </Stack>
                                </CardBody>
                            </Stack>
                        </HStack>
                            <Button colorScheme='blue'>Initiate Investment</Button>
                            <CardFooter>

                            </CardFooter>
                    </Card>
                </>)}
            </Sidebar>
        </>
    )
}

export default Investordashboardproductpage