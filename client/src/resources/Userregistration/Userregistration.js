import React, { useEffect, useState } from "react";
import {
  HStack,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Investorregistration from "./components/Investorregistration";
import Investeeregistration from "./components/Investeeregistration";
import Logo from "../../components/Logo";

const Userregistration = () => {
  const [userDecision, setUserDecision] = useState(null);
  useEffect(() => {
    const savedUserDecision = localStorage.getItem("userDecision");
    if (savedUserDecision) {
      setUserDecision(savedUserDecision);
      document.title = `Investify | ${savedUserDecision}`;
   
    }
  }, []);

  return (
    <>
      <Stack
        overflowX={"hidden"}
        width={"100svw"}
        height={{ base: "150svh", md: "100svh", lg: "100svh" }}
      >
        <Stack width={"100%"} height={"100%"} 
              backgroundColor={"#DFF0F1"}
              >
          <HStack width={"100%"} padding={"10px 5px 10px 5px"}>
            <Stack>
              <Logo />
            </Stack>
          </HStack>
          <Heading marginLeft={{ base: "10px", md: "20px", lg: "20px" }}> CREATE YOUR  {userDecision === "investor" ? (
           <span>INVESTOR</span>
          ) : userDecision === "investee" ? (
            <span>INVESTEE</span>
          ) : (
            <p>No user decision available.</p>
          )} ACCOUNT</Heading>
          <Text  marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
            Already a member?<Link to={"/user-login"}>Log In</Link>
          </Text>
          {userDecision === "investor" ? (
            <Investorregistration />
          ) : userDecision === "investee" ? (
            <Investeeregistration />
          ) : (
            <p>No user decision available.</p>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Userregistration;
