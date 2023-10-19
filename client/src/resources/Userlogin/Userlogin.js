import React, { useEffect, useState } from "react";
import "../../css/reusable.css";
// import "../../css/Userlogin/Userlogin.css";
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
  Link
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
    // <>
    //   <div className="main">
    //     <div className="userlogin-main">
    //       <div className="userlogin-header flex flex-row align-center justify-center">
    //         <div className="userlogin-header-logo-section flex flex-row align-center justify-start">
    //           <div className="userlogin-logo"></div>
    //         </div>
    //       </div>
    //       <div className="userlogin-loginarea flex flex-row align-center justify-center">
    //         <div className="userlogin-loginarea-left flex flex-column align-center justify-center">
    //           <h1 className="userlogin-loginarea-left-text">
    //             Login to Your Account
    //           </h1>
    //           <form
    //             action=""
    //             className="userlogin-loginarea-left-loginform flex flex-column align-start justify-center"
    //           >
    //             <div className="userlogin-loginarea-left-loginform-inputarea flex flex-row align-center justify-start">
    //               <div className="userlogin-loginarea-left-loginform-inputarearadio flex flex-row">
    //                 <input
    //                   type="radio"
    //                   name="role"
    //                   value="investor"
    //                   className="userlogin-radio"
    //                   checked={selectedRole === "investor"}
    //                   onChange={handleRadioChange}
    //                 />
    //                 <h5 className="userlogin-inputfields-label">Investor</h5>
    //               </div>
    //               <div className="userlogin-loginarea-left-loginform-inputarearadio flex flex-row">
    //                 <input
    //                   type="radio"
    //                   name="role"
    //                   value="investee"
    //                   className="userlogin-radio"
    //                   checked={selectedRole === "investee"}
    //                   onChange={handleRadioChange}
    //                 />
    //                 <h5 className="userlogin-inputfields-label">Investee</h5>
    //               </div>
    //             </div>

    //             <div className="userlogin-loginarea-left-loginform-inputarea">
    //               <h5 className="userlogin-inputfields-label">Email</h5>
    //               <input
    //                 type="email"
    //                 className=" userlogin-loginarea-left-loginform-inputarea-inputboxes"
    //               />
    //             </div>
    //             <div className="userlogin-loginarea-left-loginform-inputarea">
    //               <h5 className="userlogin-inputfields-label">Password</h5>
    //               <input
    //                 type="password"
    //                 className="userlogin-loginarea-left-loginform-inputarea-inputboxes"
    //               />
    //             </div>
    //             <div className="userlogin-loginarea-left-loginform-inputarea flex justify-end">
    //               <a href="#">Forgot Password?</a>
    //             </div>
    //             <div className="userlogin-loginarea-left-loginform-submitarea flex align-center justify-center">
    //               <input
    //                 type="submit"
    //                 value="Sign In"
    //                 className="userlogin-loginform-submitbutton"
    //               />
    //             </div>
    //           </form>
    //           <div className="userlogin-dropdownbutton">

    //           </div>
    //         </div>
    //         <div className="userlogin-loginarea-right flex flex-column align-center justify-center">
    //           <div className="userlogin-loginarea-right-content flex flex-column align-center justify-center">
    //             <h1 className="userlogin-loginarea-right-content-heading">
    //               New Here?
    //             </h1>
    //             <h3 className="userlogin-loginarea-right-content-text">
    //               Sign Up and unlock the potential of your financial future –
    //               Join our business investment platform today and start building
    //               wealth!
    //             </h3>
    //             <button
    //               className="userlogin-loginarea-right-signupbutton"
    //               onClick={() => navigate("/user-registration/user-role")}
    //             >
    //               Sign Up
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <Stack className="main">
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
          <HStack width={"100%"} height={"100%"} spacing={"0px"}>
            {/* Left side of the page */}
            <Stack
              width={"50%"}
              height={"100%"}
              alignItems={"center"}
              justifyContent={"center"}
              backgroundColor={"#DFF0F1"}
              borderTopRightRadius={"50px"}
              borderBottomRightRadius={"50px"}
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
                    width={"80%"}
                    variant={"filled"}
                    border={"0.5px solid grey"}
                  />
                </Stack>
                <Stack width={"80%"} >
                  <Text>Password</Text>
                  <InputGroup width={"80%"}>
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
                  size={{ base: "xs", md: "sm", lg: "lg" }}
                  onClick={() => navigate("/user-login")}
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
            {/* Right side of the page */}
            <Stack
              width={"50%"}
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
                size={{ base: "xs", md: "sm", lg: "lg" }}
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
