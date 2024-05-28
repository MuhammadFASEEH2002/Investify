import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Tr, Td, Switch, FormControl , Heading} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JTable from './components/JTable';

const Admindashboardallinvestors = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);


    const [investor, setInvestor] = useState([]);
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
        fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-all-investors`, {
            method: "GET",
            headers: {
                'token': adminToken,
                'Accept': "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setInvestor(res.investors)
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Sidebar>
            <Heading textAlign={"center"}>All Investors</Heading>

                {investor.length > 0 && <JTable
                    tableData={investor}
                    tableHeads={['Full Name', 'Email','Phone Number','CNIC']}
                    tableRender={(index, investor) => {
                        return <Row key={index} investor={investor} />
                    }}
                    bg='white'
                />}
            </Sidebar>
        </>
    )
   
    
}
const Row = ({ investor }) => {

    return <Tr
        _hover={{
            backgroundColor: 'gray.100',
            cursor: 'pointer'
        }}
    >
        <Td style={{ fontWeight: 'bold' }} >{investor?.firstName} {investor?.lastName}</Td>
        <Td>{investor?.email}</Td>
        <Td>{investor?.phoneNumber}</Td>
        <Td>{investor?.cnic}</Td>
        {/* <Td>{investee?.isVerified?"verified":"not verified"}</Td> */}
    </Tr>
}

export default Admindashboardallinvestors