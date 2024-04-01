import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import { Button, Checkbox, Spinner, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Investordashboardinitiateinvestment = () => {
  const [loading, setLoading] = useState(false)
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
                  <Button colorScheme='blue' >
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