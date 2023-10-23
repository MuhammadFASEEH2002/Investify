import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Radio,
  RadioGroup,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";

import Logo from "../../components/Logo";

const Userlogin = () => {
  const [selectedRole, setSelectedRole] = useState("Investor");
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Investify | UserLogin";
  });
  return (
    <>
      <Stack
        overflowX={"hidden"}
        width={"100svw"}
        height={{ base: "200svh", md: "100svh", lg: "100svh" }}
      >
        <Stack
          width={"100%"}
          height={"100%"}
          bgGradient="linear(to-r, #42B2FE, #001F44)"
        >
          <HStack
            width={"100%"}
            padding={"10px 5px 10px 5px"}
            position={"absolute"}
            top={0}
          >
            <Stack>
              <Logo />
            </Stack>
          </HStack>
          <HStack
            width={"100%"}
            height={{ base: "200%", md: "100%", lg: "100%" }}
            spacing={"0px"}
            flexDirection={{ base: "column", md: "row", lg: "row" }}
          >
            {/* Left side of the page */}
            <Stack
              width={{ base: "100%", md: "50%", lg: "50%" }}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              backgroundColor={"#DFF0F1"}
              // borderTopRightRadius={"50px"}
              // borderBottomRightRadius={"50px"}
              borderTopRightRadius={{ base: "0", md: "50px", lg: "50px" }}
              borderBottomRightRadius={{ base: "80px", md: "50px", lg: "50px" }}
              borderBottomLeftRadius={{ base: "80px", md: "0", lg: "0" }}
           
            >
              <Heading marginBottom={"30px"}> Login to Your Account</Heading>
              <Stack
                width={"90%"}
                alignItems={"center"}
                justifyContent={"flex-start"}
              >
                <RadioGroup
                  onChange={setSelectedRole}
                  value={selectedRole}
                  width={"80%"}
                >
                  <Stack
                    direction="row"
                    alignItems={"center"}
                    justifyContent={"flex-start"}
                    width={"80%"}
                  >
                    <Radio
                      size={"md"}
                      value="Investor"
                      border={"0.5px solid grey"}
                      marginRight={"20px"}
                    >
                      Investor
                    </Radio>
                    <Radio
                      value="Investee"
                      border={"0.5px solid grey"}
                      marginLeft={"20px"}
                    >
                      Investee
                    </Radio>
                  </Stack>
                </RadioGroup>
                <Stack width={"80%"} marginBottom={"20px"}>
                  <Text>Email address</Text>
                  <Input
                    type="email"
                    placeholder="Enter Your email"
                    width={{ base: "100%", md: "80%", lg: "80%" }}
                    variant={"filled"}
                    border={"0.5px solid grey"}
                  />
                </Stack>
                <Stack width={"80%"}>
                  <Text>Password</Text>
                  <InputGroup width={{ base: "100%", md: "80%", lg: "80%" }}>
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
                <Stack width={"80%"} marginBottom={"20px"}>
                  <Link>Forgot Password?</Link>
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
            {/* Right side of the page */}
            <Stack
              width={{ base: "100%", md: "50%", lg: "50%" }}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Heading color={"white"}> New Here?</Heading>
              <Text
                width={"60%"}
                color={"white"}
                fontSize={{ base: "0.7rem", md: "1rem", lg: "1.5rem" }}
                marginBottom={"30px"}
              >
                Sign Up and unlock the potential of your financial future – Join
                our business investment platform today and start building
                wealth!
              </Text>
              <Button
                colorScheme="gray"
                marginRight={"10px"}
                size={{ base: "md", md: "md", lg: "lg" }}
                onClick={() => navigate("/user-registration/user-role")}
              >
                Sign Up
              </Button>
            </Stack>
          </HStack>
        </Stack>
      </Stack>
    </>
  );
};

export default Userlogin;
