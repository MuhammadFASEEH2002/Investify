import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useInvestor from '../../providers/investorStore';


const Investordashboardlogout = () => {
    const navigate = useNavigate();
    const setInvestor = useInvestor((state) => state?.setInvestor)

    const logout = () => {
        window.localStorage.removeItem('token1');
        setInvestor(null) 
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