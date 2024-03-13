import React from 'react'
import Sidebar from './components/Sidebar'
import { Button } from '@chakra-ui/react'
import { Link, useNavigate } from 'react-router-dom'

const Investeedashboardallchats = () => {
    const navigate=useNavigate()
    return (
        <Sidebar>
            <Button colorScheme='blue' variant='outline' onClick={() => {
                navigate(`/user/investee-dashboard/chat/65db9d4244a6ce94f3230e05/65da5210cda880d24b79f024`)
            }
            }>Chat</Button>
        </Sidebar>
    )
}

export default Investeedashboardallchats