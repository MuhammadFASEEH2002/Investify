import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useInvestee from '../../providers/investeeStore';


const Investeedashboardlogout = () => {
    const navigate = useNavigate();
    const setInvestee = useInvestee((state) => state?.setInvestee)
    const logout = () => {
        window.localStorage.removeItem('token');
        setInvestee(null)
        navigate("/user-login")
    };
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
