import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

const Adminlogin = () => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Investify | AdminLogin";
  });
  return (
    <>
      <Stack
        overflowX={"hidden"}
        width={"100svw"}
        height={{ base: "100svh", md: "100svh", lg: "100svh" }}
      >
        <Stack width={"100%"} height={"100%"} backgroundColor={"#DFF0F1"}>
          <HStack
            width={"100%"}
            height={{ base: "200%", md: "100%", lg: "100%" }}
            spacing={"0px"}
            flexDirection={{ base: "column-reverse", md: "row", lg: "row" }}
          >
            {/* Left side of the page */}
            <Stack
              width={{ base: "100%", md: "50%", lg: "50%" }}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              backgroundColor={"#DFF0F1"}
              display={{ base: "none", md: "flex", lg: "flex" }}
            >
              <Stack
                height={{ base: "250px", md: "400px", lg: "500px" }}
                width={{ base: "150px", md: "300px", lg: "400px" }}
                backgroundImage="url('/images/logo2.png')"
                backgroundSize={"100% 100%"}
              ></Stack>
            </Stack>
            {/* Right side of the page */}
            <Stack
              width={{ base: "100%", md: "50%", lg: "50%" }}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              borderTopLeftRadius={{ base: "0", md: "50px", lg: "50px" }}
              borderBottomLeftRadius={{ base: "80px", md: "50px", lg: "50px" }}
              borderBottomRightRadius={{ base: "80px", md: "0", lg: "0" }}
              bgGradient="linear(to-r, #42B2FE, #001F44)"
            >
              <Stack
                height={{ base: "50px", md: "80px", lg: "100px" }}
                width={{ base: "50px", md: "80px", lg: "100px" }}
                backgroundImage="url('/images/admin_login_logo.png')"
                backgroundSize={"100% 100%"}
              ></Stack>
              <Heading color={"white"}>Admin Login</Heading>
              <Stack
                width={"90%"}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <Stack width={"80%"} marginBottom={"20px"}>
                  <Text color={"white"}>Email address</Text>
                  <Input
                    type="email"
                    placeholder="Enter Your email"
                    width={{ base: "100%", md: "90%", lg: "90%" }}
                    variant={"filled"}
                    border={"0.5px solid grey"}
                  />
                </Stack>
                <Stack width={"80%"}>
                  <Text color={"white"}>Password</Text>
                  <InputGroup width={{ base: "100%", md: "90%", lg: "90%" }}>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      variant={"filled"}
                      border={"0.5px solid grey"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Stack>

                <Button
                  colorScheme="teal"
                  variant="outline"
                  marginRight={"10px"}
                  size={{ base: "md", md: "md", lg: "lg" }}
                  onClick={() => navigate("/user-login")}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
          </HStack>
        </Stack>
      </Stack>
    </>
  );
};

export default Adminlogin;
