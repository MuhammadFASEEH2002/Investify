import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useInvestor from '../../providers/investorStore';
import useListing from '../../providers/listingStore';


const Investordashboardlogout = () => {
    const navigate = useNavigate();
    const setInvestor = useInvestor((state) => state?.setInvestor)
    const setListing = useListing((state) => state?.setListing)


    const logout = () => {
        window.localStorage.removeItem('token1');
        setInvestor(null)
        setListing(null)
        navigate("/user-login")
    };
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