import { Stack } from '@chakra-ui/react'
import React from 'react'

const Logo = () => {
  return (
    <>
    <Stack
                height={{ base: "30px", md: "60px", lg: "60px" }}
                width={{ base: "30px", md: "50px", lg: "50px" }}
                backgroundImage="url('/images/logo.png')"
                backgroundSize={"100% 100%"}
              ></Stack>
    </>
  )
}

export default Logo