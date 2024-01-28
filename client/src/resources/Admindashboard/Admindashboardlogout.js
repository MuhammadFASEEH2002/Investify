import React, { useEffect } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";


const Admindashboardlogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        window.localStorage.removeItem('adminToken');
        navigate("/admin-login")
    };
    useEffect(() => {
        document.title = "Investify | Investee-Home";
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

export default Admindashboardlogout
