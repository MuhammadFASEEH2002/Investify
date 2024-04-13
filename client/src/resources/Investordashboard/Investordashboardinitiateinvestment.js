import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import { Button, Checkbox, Spinner, Stack } from '@chakra-ui/react'
import { Link, useParams } from 'react-router-dom'
import useListing from "../../providers/listingStore";
import { useNavigate } from "react-router-dom";

const Investordashboardinitiateinvestment = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const { id } = useParams();

  const makePayment = async () => {
    setLoading(true)
    const token1 = window.localStorage.getItem('token1');
    fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investor/make-payment`, {
      method: "POST",
      headers: {
        "id": id,
        'token': token1,
        'Accept': "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status) {
          if (res.session.url) {
            window.location.href = res.session.url
          }
        } else {
          setLoading(true)
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
   
    if (window.localStorage.getItem('token1')) {
      document.title = "Investify | Investor-investment-initiation";

    } else {
      navigate("/user-login");
    }
  }, []);
  return (
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
        <Stack alignItems={'center'} justifyContent={'center'}>
          <Checkbox colorScheme='blue'>I accept all the investment terms and conditions</Checkbox>
          <Button colorScheme='blue'
            onClick={() => { makePayment() }}>
            <Link to={``}>
              Proceed to Payment
            </Link>
          </Button>
        </Stack>
      </>)}
    </Sidebar>
  )
}

export default Investordashboardinitiateinvestment