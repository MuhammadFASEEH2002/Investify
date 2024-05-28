import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Tr, Td, Switch, FormControl, Card, HStack, Text, Button, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import JTable from './components/JTable';
import { FaDollarSign } from "react-icons/fa";

const Admindashboardtransactions = () => {
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [incomingAmount, setIncomingAmount] = useState('');
    const [outgoingAmount, setOutgoingAmount] = useState('');

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
                fundCalculator(res.transactions)
            })
            .catch((err) => console.log(err));
    };
    const fundCalculator = (transaction) => {
        let incomingAmount = 0
        let outgoingAmount = 0
        transaction.map((item) => {
            if (item?.amountType == "incoming") {
                incomingAmount += Number(item?.amount)
            } else {
                outgoingAmount += Number(item?.amount)
            }
        })
        setIncomingAmount(incomingAmount)

        setOutgoingAmount(outgoingAmount)

    }
    return (
        <>
            <Sidebar>
            <Heading textAlign={"center"}>All Transactions</Heading>

                <HStack justifyContent={'space-evenly'} my={5} flexWrap={"wrap"}>

                    <StatCard
                        colorscheme="blue"
                        title="Total Incoming Amount"
                        listings={`Rs ${Number(incomingAmount).toLocaleString('en-IN')}`}
                        icon={<FaDollarSign/>}
                    />
                    <StatCard
                        colorscheme="red"
                        title="Total Outgoing Amount"
                        listings={`Rs ${Number(outgoingAmount).toLocaleString('en-IN')}`}
                        icon={<FaDollarSign/>}

                    />
                    <StatCard
                        colorscheme="green"
                        title="Remaining Amount"
                        listings={`Rs ${(Number(incomingAmount) - Number(outgoingAmount)).toLocaleString('en-IN')}`}
                        icon={<FaDollarSign/>}

                    />



                </HStack>

                {transactions.length > 0 && <JTable
                    tableData={transactions}
                    tableHeads={['S.No', 'Amount', 'Type', 'Listing ID', 'From', 'To', 'Status']}
                    tableRender={(index, transactions) => {
                        return <Row index={index + 1} transactions={transactions} />
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
        <Td>Rs {Number(transactions?.amount).toLocaleString('en-IN')}</Td>
        <Td>{transactions?.amountType}</Td>
        <Td>{transactions?.listingId?._id}</Td>
        <Td>{transactions?.from}</Td>
        <Td>{transactions?.to}</Td>
        <Td>{transactions?.status}</Td>

    </Tr>
}
const StatCard = (props) => {
    return <Card
        direction={'column'}
        overflow='hidden'
        variant='outline'
        backgroundColor={`${props.colorscheme}.50`}
        borderColor={props.colorscheme}
        colorScheme={props.colorscheme}
        padding={4}
        minW={'24%'}
    >
        <HStack justifyContent={'space-between'} width={'100%'} >
            <Text>{props.title}</Text>
            <Button colorScheme={props.colorscheme}>
                {props.icon}
            </Button>
        </HStack>
        <HStack>
            <Heading>{props.listings}</Heading>
        </HStack>
        {/* <HStack mt={2}>
      <Badge colorScheme={props.colorscheme} p={1} >{props.recordsCount} records</Badge>
    </HStack> */}

    </Card>
}

export default Admindashboardtransactions