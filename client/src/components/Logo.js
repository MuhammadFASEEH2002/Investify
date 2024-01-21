import { Stack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <>
      <Link to={"/"}> 
        <Stack
          height={{ base: "30px", md: "60px", lg: "60px" }}
          width={{ base: "30px", md: "50px", lg: "50px" }}
          backgroundImage="url('/images/logo.png')"
          backgroundSize={"100% 100%"}
        ></Stack>
      </Link>
    </>
  )
}

export default Logo