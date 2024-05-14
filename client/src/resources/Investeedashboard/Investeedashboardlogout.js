import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useInvestee from '../../providers/investeeStore';


const Investeedashboardlogout = () => {
    const navigate = useNavigate();
    const setInvestee = useInvestee((state) => state?.setInvestee)
    const investee = useInvestee((state) => state?.investees)
    // const messagesRef = collection(db, 'messages');

    const logout = async () => {
        try {
            const token = window.localStorage.getItem('token');
            fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/logout`, {
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
                        console.log("logout success")
                        window.localStorage.removeItem('token');
                        setInvestee(null)
                        navigate("/user-login")
                    } else {
                        console.log("error")
                    }
                })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error)
        }

    }
    // const updateStatus = async (investeeID) => {
    //     console.log(investeeID)
    //     const queryMessages = query(
    //         messagesRef,
    //         where("userId", "==", investeeID)
    //     );
    //     const querySnapshot = await getDocs(queryMessages);
    //     // console.log(querySnapshot)
    //     querySnapshot.forEach((document) => {
    //         console.log(document.id)
    //         const documentRef = doc(db, "messages", document.id);
    //         updateDoc(documentRef, {
    //             online: false
    //         })
    //     });
    // }
    useEffect(() => {
        if (window.localStorage.getItem('token')) {
            document.title = "Investify | Investee-Logout";
            logout();
        } else {
            navigate("/user-login");
        }
        logout();
    }, []);
    return (
        <>
            <Sidebar>
                <Stack alignItems={'center'} justifyContent={'center'}>
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Stack>
            </Sidebar>
        </>
    )
}

export default Investeedashboardlogout
