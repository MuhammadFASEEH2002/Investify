import React, { useEffect, useState } from "react";
import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Checkbox,
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
      // localStorage.removeItem("userDecision");
    }
    // document.title = `Investify | ${savedUserDecision}`;
    // localStorage.removeItem("userDecision");
  }, []);

  return (
    <>
      <Stack
        overflowX={"hidden"}
        width={"100svw"}
        height={{ base: "200svh", md: "100svh", lg: "100svh" }}
      >
        <Stack width={"100%"} height={"100%"}>
          <HStack width={"100%"} padding={"10px 5px 10px 5px"}>
            <Stack>
              <Logo />
            </Stack>
          </HStack>
          <Heading> CREATE YOUR INVESTOR ACCOUNT</Heading>
          <Text>
            Already a member?<Link>Log In</Link>
          </Text>
          {userDecision === "investor" ? (
            <Investorregistration />
          ) : userDecision === "investee" ? (
            <Investeeregistration />
          ) : (
            <p>No user decision available.</p>
          )}
          <Stack alignItems={"center"} justifyContent={"center"}>
            <Checkbox> I agree to Investify terms and conditions</Checkbox>
            <Button
              colorScheme="teal"
              variant="solid"
              marginRight={"10px"}
              size={{ base: "md", md: "md", lg: "lg" }}
            >
              Sign In
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Userregistration;
