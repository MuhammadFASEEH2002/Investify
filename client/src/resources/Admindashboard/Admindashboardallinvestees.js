import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Tr, Td, Switch, FormControl, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JTable from './components/JTable';


const Admindashboardallinvestees = () => {
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();
    const [investee, setInvestee] = useState([]);
    useEffect(() => {
        if (window.localStorage.getItem('adminToken')) {
            document.title = "Investify | Admin-All Investees";
            setIsLoading(true);
            getInvestees();
            setIsLoading(false);
        } else {
            navigate("/admin-login");
        }
    }, []);
    const getInvestees = () => {
        const adminToken = window.localStorage.getItem('adminToken');
        fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-all-investees`, {
            method: "GET",
            headers: {
                'token': adminToken,
                'Accept': "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setInvestee(res.investees)
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Sidebar>
            <Heading textAlign={"center"}>All Investees</Heading>

                {investee.length > 0 && <JTable
                    tableData={investee}
                    tableHeads={['Business Name', 'Email', 'Phone Number', 'CNIC', 'Verification Status']}
                    tableRender={(index, investee) => {
                        return <Row key={index} investee={investee} />
                    }}
                    bg='white'
                />}
            </Sidebar>
        </>
    )
}
const Row = ({ investee }) => {

    return <Tr
        _hover={{
            backgroundColor: 'gray.100',
            cursor: 'pointer'
        }}
    >
        <Td style={{ fontWeight: 'bold' }} >{investee?.businessName} </Td>
        <Td>{investee?.email}</Td>
        <Td>{investee?.phoneNumber}</Td>
        <Td>{investee?.cnic}</Td>
        <Td>{investee?.isVerified ? "verified" : "not verified"}</Td>
    </Tr>
}

export default Admindashboardallinvestees