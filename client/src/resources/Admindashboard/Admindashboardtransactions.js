import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Tr, Td, Switch, FormControl } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JTable from './components/JTable';

const Admindashboardtransactions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        if (window.localStorage.getItem('adminToken')) {
            document.title = "Investify | Admin-All Transactions";
            setIsLoading(true);
            getTransactions();
            setIsLoading(false);
        } else {
            navigate("/admin-login");
        }
    }, []);
    const getTransactions = () => {
        const adminToken = window.localStorage.getItem('adminToken');
        fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-all-transactions`, {
            method: "GET",
            headers: {
                'token': adminToken,
                'Accept': "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setTransactions(res.transactions)
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <Sidebar>
                {transactions.length > 0 && <JTable
                    tableData={transactions}
                    tableHeads={['S.No', 'Amount', 'Type','Listing ID', 'From', 'To', 'Status']}
                    tableRender={(index, transactions) => {
                        return <Row index={index+1} transactions={transactions} />
                    }}
                    bg='white'
                />}
            </Sidebar>
        </>
    )
}
const Row = ({ index, transactions }) => {

    return <Tr
        _hover={{
            backgroundColor: 'gray.100',
            cursor: 'pointer'
        }}
    >
        <Td style={{ fontWeight: 'bold' }} >{index} </Td>
        <Td>{transactions?.amount}</Td>
        <Td>{transactions?.amountType}</Td>
        <Td>{transactions?.listingId?._id}</Td>
        <Td>{transactions?.from}</Td>
        <Td>{transactions?.to}</Td>
        <Td>{transactions?.status}</Td>

    </Tr>
}

export default Admindashboardtransactions