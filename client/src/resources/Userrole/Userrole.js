import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/reusable.css";
import "../../css/Userrole/Userrole.css";
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
  Center,
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
      {/* <div className="main">
        <div className="userrole-main">
          <div className="userrole-header flex flex-row align-center justify-center">
            <div className="userrole-header-logo-section flex flex-row align-center justify-start">
              <div className="userrole-logo"></div>
            </div>
          </div>
          <div className="userrole-text-section flex align-center justify-center">
            <h1 className="userrole-text">
              Welcome to Investify – Your Gateway to Business Investment
              Opportunities.
            </h1>
          </div>
          <div className="userrole-decsionbutton-section flex flex-row align-center justify-even">
            <DecisionButton
              heading="I Want to Invest"
              text="Join our network as an investor, explore promising businesses, and start making strategic investments."
              onClick={() => {
                setUserDecision("investor");
                localStorage.setItem("userDecision", "investor");
                navigate("/user-registration");}}
            />
            <DecisionButton
              heading="I Want to List My Business"
              text="Showcase your business, attract potential investors, and take the next step towards growth."
              onClick={() =>{ 
                setUserDecision("investee");
                localStorage.setItem("userDecision", "investee");
                navigate("/user-registration");}}
            />
          </div>
        </div>
      </div> */}
      <Stack className="main">
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
