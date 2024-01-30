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
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack
} from "@chakra-ui/react";
import Logo from "../../components/Logo";

const Userlogin = () => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const [selectedRole, setSelectedRole] = useState("investor");
  const [selectedRole1, setSelectedRole1] = useState("investor");
  const [show, setShow] = React.useState(false);
  const [showNewPass, setShowNewPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleNewPassClick = () => setShowNewPass(!showNewPass);
  const handleConfirmPassClick = () => setShowConfirmPass(!showConfirmPass);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Investify | UserLogin";
    if (window.localStorage.getItem('token')){
      navigate("/user/investee-dashboard/home");
    } else if (window.localStorage.getItem('token1')) {
      navigate("/user/investor-dashboard/business-catalog");
    }
  });
  const onOpen = () => {
    setIsModalOpen(true);
  };

  const onClose = () => {
    setIsModalOpen(false);
    setOtp(false);
  };
  const checkIfNumber = (event) => {
    const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
    return !event.key.match(regex) && event.preventDefault();
  }
  const investorLogin = () => {
    if (email && password) {
      fetch("http://127.0.0.1:3001/api/auth/investor-login", {
        method: "POST",
        body: JSON.stringify({
          email,
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
            window.localStorage.setItem("token1", res.token1);
            navigate("/user/investor-dashboard/business-catalog");
          } else {
            // alert(res.message);
            toast({
              title: "Authentication Error",
              description: res.message,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top"
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
  const sendOtp = () => {
    if (email && password) {
      fetch("http://127.0.0.1:3001/api/auth/send-otp", {
        method: "POST",
        body: JSON.stringify({
          email,
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
            setOtp(true);
          } else {
            // alert(res.message);
            toast({
              title: "Authentication Error",
              description: res.message,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top"
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
  const investeeLogin = () => {
    if (email && password) {
      fetch("http://127.0.0.1:3001/api/auth/investee-login", {
        method: "POST",
        body: JSON.stringify({
          email,
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
            window.localStorage.setItem("token", res.token);

            navigate("/user/investee-dashboard/home");
          } else {
            toast({
              title: "Authentication Error",
              description: res.message,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top"
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
                      value="investor"
                      border={"0.5px solid grey"}
                      marginRight={"20px"}
                    >
                      Investor
                    </Radio>
                    <Radio
                      value="investee"
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
                    onChange={(event) => handleInputChange(event, setEmail)}
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
                      onChange={(event) =>
                        handleInputChange(event, setPassword)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          if (selectedRole === "investor") {
                            investorLogin();
                          } else {
                            investeeLogin();
                          }
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
                <Stack width={"80%"} marginBottom={"20px"}>
                  <Link onClick={() => onOpen()} >Forgot Password?</Link>
                  <Modal onClose={onClose} isOpen={isModalOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader></ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>Select Role:</Text>
                        <RadioGroup
                          onChange={setSelectedRole1}
                          value={selectedRole1}
                          width={"80%"}
                          margin={"5px"}
                        >
                          <Stack
                            direction="row"
                            alignItems={"center"}
                            justifyContent={"flex-start"}
                            width={"80%"}
                          >
                            <Radio
                              size={"md"}
                              value="investor"
                              border={"0.5px solid grey"}
                              marginRight={"20px"}
                            >
                              Investor
                            </Radio>
                            <Radio
                              value="investee"
                              border={"0.5px solid grey"}
                              marginLeft={"20px"}
                            >
                              Investee
                            </Radio>
                          </Stack>
                        </RadioGroup>
                        <VStack alignItems={"flex-start"}>
                          <Text>Email address</Text>
                          <HStack>

                            <Input
                              type="email"
                              placeholder="Enter Your email"
                              width={{ base: "100%", md: "80%", lg: "80%" }}
                              variant={"filled"}
                              border={"0.5px solid grey"}
                              onChange={(event) => handleInputChange(event, setEmail)}
                            />

                            <Button colorScheme="teal"
                              variant="solid">Get OTP</Button>
                          </HStack>
                          {otp ? (     <>
                            <Text>Enter OTP</Text>
                            <Input
                              type="number"
                              placeholder="Enter 4 digit OTP."
                              width={{ base: "100%", md: "80%", lg: "80%" }}
                              variant={"filled"}
                              border={"0.5px solid grey"}
                              onChange={(event) => handleInputChange(event, setEmail)}
                              onKeyDown={(event) => checkIfNumber(event)}
                            />
                            <Text>New Password</Text>
                            <InputGroup width={{ base: "100%", md: "80%", lg: "80%" }}>
                              <Input
                                pr="4.5rem"
                                type={showNewPass ? "text" : "password"}
                                placeholder="Enter password"
                                variant={"filled"}
                                border={"0.5px solid grey"}
                                onChange={(event) =>
                                  handleInputChange(event, setNewPassword)
                                }
                              />
                              <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleNewPassClick}>
                                  {showNewPass ? "Hide" : "Show"}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                            <Text>Confirm New Password</Text>
                            <InputGroup width={{ base: "100%", md: "80%", lg: "80%" }}>
                              <Input
                                pr="4.5rem"
                                type={showConfirmPass ? "text" : "password"}
                                placeholder="Enter password"
                                variant={"filled"}
                                border={"0.5px solid grey"}
                                onChange={(event) =>
                                  handleInputChange(event, setConfirmPassword)
                                }
                              />
                              <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleConfirmPassClick}>
                                  {showConfirmPass ? "Hide" : "Show"}
                                </Button>
                              </InputRightElement>
                            </InputGroup>
                          </>):(<></>)
                       
                          }
                        </VStack>
                      </ModalBody>
                      <ModalFooter>
                        {/* <Stack>
                          <Button colorScheme="teal" variant="solid">Get OTP</Button>
                        </Stack> */}
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Stack>
                <Button
                  colorScheme="teal"
                  variant="outline"
                  marginRight={"10px"}
                  size={{ base: "md", md: "md", lg: "lg" }}
                  onClick={() => {
                    if (selectedRole == "investor") {
                      investorLogin();
                    } else {
                      investeeLogin();
                    }
                  }}
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
