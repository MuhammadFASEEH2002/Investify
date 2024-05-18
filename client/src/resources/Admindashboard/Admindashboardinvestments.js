import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import { useToast, Tr, Td, Switch, FormControl, Card, HStack, Text, Button, Heading ,Stack,Spinner} from '@chakra-ui/react';
import { useNavigate ,Link} from 'react-router-dom';
import JTable from './components/JTable';

const Admindashboardinvestments = () => {
    const [investment, setInvestment] = useState([]);
    const [loading, setLoading] = useState(false)
    const toast = useToast()
    const navigate = useNavigate();
  
    useEffect(() => {
      if (window.localStorage.getItem('adminToken')) {
        document.title = "Investify | Admin - All Investments";
        getInvestment();
      } else {
        navigate("/admin-login");
      }
    }, []);
    const getInvestment = () => {
      setLoading(true)
      const admintoken = window.localStorage.getItem('adminToken');
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/admin/get-investments`, {
        method: "GET",
        headers: {
          'token': admintoken,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status) {
            setInvestment(res.investments)
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
        <>
            <Sidebar>
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
                            tableHeads={['Business Name', 'Business Description', 'Amount Given', 'Investment Duration', 'Profit Share Percentage']}
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
        </>
    )
}

const Row = ({ investment }) => {

    return <Tr
      _hover={{
        backgroundColor: 'gray.100',
        cursor: 'pointer'
      }}
    >
      <Td style={{ fontWeight: 'bold' }} color={"blue"}><Link to={`#`} >{investment?.investee_id?.businessName}</Link></Td>
      <Td>{investment?.description.slice(0, 80)}... </Td>
      <Td>Rs {investment?.amount} /- </Td>
      <Td>{investment?.investmentDuration} years </Td>
      <Td>{investment?.profitPercentage} % </Td>
      {/* <Td>{investor?.email}</Td>
        <Td>{investor?.phoneNumber}</Td>
        <Td>{investor?.cnic}</Td> */}
      {/* <Td>{investee?.isVerified?"verified":"not verified"}</Td> */}
    </Tr>
  }
  

export default Admindashboardinvestments