import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useInvestee from '../../providers/investeeStore';
import { db } from '../../utils/firebase';
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    updateDoc,
    getDocs,
    doc
} from "firebase/firestore";

const Investeedashboardlogout = () => {
    const navigate = useNavigate();
    const setInvestee = useInvestee((state) => state?.setInvestee)
    const investee = useInvestee((state) => state?.investees)
    // const messagesRef = collection(db, 'messages');


    const logout = () => {
        window.localStorage.removeItem('token');
        // updateStatus(investee?._id)
        navigate("/user-login")
    };
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
    //     setInvestee(null)
    // }
    useEffect(() => {
        document.title = "Investify | Investee-Logout";
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
