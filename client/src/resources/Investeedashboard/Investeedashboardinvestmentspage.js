import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { Spinner, Stack, useToast, Tr, Td, Heading } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import JTable from './components/JTable';

const Investeedashboardinvestmentspage = () => {
  const [investment, setInvestment] = useState([]);
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      document.title = "Investify | Investee-Investments";
      getInvestment();
    } else {
      navigate("/user-login");
    }
  }, []);
  const getInvestment = () => {
    setLoading(true)
    const token = window.localStorage.getItem('token');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/get-investments`, {
      method: "GET",
      headers: {
        'token': token,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          setInvestment(res.listing)
          setLoading(false)
        } else {
          toast({
            title: "Network Error",
            status: "error",
            duration: 9000,
            isClosable: true,
            position: "top",
          });
          setLoading(false)
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Sidebar>
      <Heading textAlign={"center"}>All Fundings</Heading>

      {loading ? (<>
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='xl'
          />
        </Stack>
      </>) : (<>
        {investment.length > 0 ? (
          <JTable
            tableData={investment}
            tableHeads={['Business Name', 'Amount Received', 'Investment Duration', 'Profit Share Percentage','Investment Status']}
            tableRender={(index, investment) => {
              return <Row key={index} investment={investment} />;
            }}
            bg='white'
          />
        ) : (
          <p>No investments found.</p>
        )}
      </>)}

    </Sidebar>
  )
}
const Row = ({ investment }) => {

  return <Tr
    _hover={{
      backgroundColor: 'gray.100',
      cursor: 'pointer'
    }}
  >
    <Td style={{ fontWeight: 'bold' }} color={"blue"}><Link to={`/user/investee-dashboard/investment-detail/${investment?._id}`} >{investment?.investee_id?.businessName}</Link></Td>

    <Td>Rs {Number(investment?.amount).toLocaleString('en-IN')} /- </Td>
    <Td>{investment?.investmentDuration} years </Td>
    <Td>{investment?.profitPercentage} % </Td>
    {investment?.isInvestmentEnded? <Td>Ended</Td> : <Td>Ongoing</Td>}
    {/* <Td>{investment?.investment_start_date}  </Td>
    <Td>{investment?.investment_end_date}  </Td> */}
  </Tr>
}

export default Investeedashboardinvestmentspage