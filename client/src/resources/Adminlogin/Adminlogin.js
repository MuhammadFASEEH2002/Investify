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
  useToast,
} from "@chakra-ui/react";

const Adminlogin = () => {
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Investify | AdminLogin";
    if(window.localStorage.getItem('adminToken')){
      navigate("/admin/admin-dashboard/home");

    }
  });
  const adminLogin = () => {
    if (username && password) {
      // const apiKey = process.env.FETCH_URL;
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/auth/admin-login`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status) {
            window.localStorage.setItem("adminToken", res.adminToken);
            navigate("/admin/admin-dashboard/home");
          } else {
            // alert(res.message);
            toast({
              title: "Authentication Error",
              description: res.message,
              status: "error",
              duration: 9000,
              isClosable: true,
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast({
        title: "Empty Fields",
        description: "Kindly fill the required fields",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
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
                backgroundImage="url('/images/logo.png')"
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
                  <Text color={"white"}>Username</Text>
                  <Input
                    type="email"
                    placeholder="Enter Your Username"
                    width={{ base: "100%", md: "90%", lg: "90%" }}
                    variant={"solid"}
                    border={"0.5px solid grey"}
                    onChange={(event) => handleInputChange(event, setUsername)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          adminLogin()
                        }
                      }}
                    
                  />
                </Stack>
                <Stack width={"80%"}>
                  <Text color={"white"}>Password</Text>
                  <InputGroup width={{ base: "100%", md: "90%", lg: "90%" }}>
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter Password"
                      variant={"solid"}
                      border={"0.5px solid grey"}
                      onChange={(event) =>
                        handleInputChange(event, setPassword)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          adminLogin()
                        }
                      }}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Stack>

                <Button
                  colorScheme='gray'
                  // variant="outline"
                  marginTop={"10px"}
                  size={{ base: "md", md: "md", lg: "lg" }}
                  onClick={adminLogin}
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
