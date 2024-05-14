import React, { useEffect, useState } from 'react'
import Sidebar from "./components/Sidebar";
import { Spinner, Stack } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import useInvestor from '../../providers/investorStore';
import useListing from '../../providers/listingStore';



const Investordashboardlogout = () => {
    const navigate = useNavigate();
    const setInvestor = useInvestor((state) => state?.setInvestor)
    const investor = useInvestor((state) => state?.investors)
    const setListing = useListing((state) => state?.setListing)


    const logout = async () => {
        try {
            const token1 = window.localStorage.getItem('token1');
            fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/logout`, {
                method: "GET",
                headers: {
                    'token': token1,
                    'Accept': "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    if (res.status) {
                        console.log("logout success")
                        window.localStorage.removeItem('token1');
                        setListing(null)
                        setInvestor(null)
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
    useEffect(() => {
        if (window.localStorage.getItem('token1')) {
            document.title = "Investify | Investor-Logout";
            logout();
        } else {
            navigate("/user-login");
        }
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