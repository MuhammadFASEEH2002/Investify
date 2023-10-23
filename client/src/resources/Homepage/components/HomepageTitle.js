import React from "react";
import { HStack, Heading, Stack } from "@chakra-ui/react";

const HomepageTitle = () => {
  return (
    <>
      <HStack
        width={"100%"}
        padding={"20px 15px 20px 15px"}
        backgroundColor={"#EAEDEF"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        id="homepage-title"
      >
        <Stack width={"40%"} alignItems={"center"} justifyContent={"center"}>
          <Stack
            width={{ base: "130px", md: "180px", lg: "300px" }}
            height={{ base: "130px", md: "180px", lg: "300px" }}
            backgroundSize={"100% 100%"}
            backgroundImage="url('/images/homepage-title-image.png')"
            marginBottom={{ base: 10, md: 0, lg: 0 }}
          ></Stack>
        </Stack>
        <Stack width={"100%"}>
          <Heading
            color={"black"}
            fontSize={{ base: "1.4rem", md: "1.7rem", lg: "3rem" }}
            fontWeight={"medium"}
            textAlign={"center"}
          >
            Investify
          </Heading>
          <Heading
            color={"black"}
            fontSize={{ base: "1.1rem", md: "1.5rem", lg: "2.5rem" }}
            textAlign={"center"}
            fontWeight={"light"}
          >
            Your Gateway to Business Investment Opportunities
          </Heading>
        </Stack>
      </HStack>
    </>
  );
};

export default HomepageTitle;
