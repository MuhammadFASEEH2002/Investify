import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HStack,
  Heading,
  Stack,
} from "@chakra-ui/react";
import DecisionButton from "./components/DecisionButton";
import Logo from "../../components/Logo";

const Userrole = () => {
  const [userDecision, setUserDecision] = useState(null);
  useEffect(() => {
    document.title = "Investify | User-Role";
  });
  const navigate = useNavigate();
  return (
    <>
      <Stack overflowX={"hidden"} width={"100svw"} height={"100svh"}>
        <Stack
          width={"100%"}
          height={"100%"}
          backgroundColor={"#EAEDEF"}
          alignItems={"center"}
          justifyContent={"center"}
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
          <Stack>
            <Heading
              fontSize={{ base: "1rem", md: "1.5rem", lg: "2rem" }}
              textAlign={"center"}
            >
              Welcome to Investify – Your Gateway to Business Investment
              Opportunities.
            </Heading>
            <HStack
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={{ base: "column", md: "row", lg: "row" }}
              paddingTop={"20px"}
            >
              <DecisionButton
                heading="I Want to Invest"
                text="Join our network as an investor, explore promising businesses, and start making strategic investments."
                onClick={() => {
                  setUserDecision("investor");
                  localStorage.setItem("userDecision", "investor");
                  navigate("/user-registration");
                }}
              />
              <DecisionButton
                heading="I Want to List My Business"
                text="Showcase your business, attract potential investors, and take the next step towards growth."
                onClick={() => {
                  setUserDecision("investee");
                  localStorage.setItem("userDecision", "investee");
                  navigate("/user-registration");
                }}
              />
            </HStack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default Userrole;
