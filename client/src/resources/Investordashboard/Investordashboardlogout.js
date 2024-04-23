import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useInvestor from '../../providers/investorStore';
import useListing from '../../providers/listingStore';
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


const Investordashboardlogout = () => {
    const navigate = useNavigate();
    const setInvestor = useInvestor((state) => state?.setInvestor)
    const investor = useInvestor((state) => state?.investors)
    const messagesRef = collection(db, 'messages');
    const setListing = useListing((state) => state?.setListing)


    const logout = () => {
        window.localStorage.removeItem('token1');
        setListing(null)
        updateStatus(investor?._id)

        navigate("/user-login")
    };
    const updateStatus = async (investorID) => {
        console.log(investorID)
        const queryMessages = query(
            messagesRef,
            where("userId", "==", investorID)
        );
        const querySnapshot = await getDocs(queryMessages);
        // console.log(querySnapshot)
        querySnapshot.forEach((document) => {
            console.log(document.id)
            const documentRef = doc(db, "messages", document.id);
            updateDoc(documentRef, {
                online: false
            })
        });
        setInvestor(null)

    }
    useEffect(() => {
        document.title = "Investify | Investor-Logout";
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

export default Investordashboardlogout