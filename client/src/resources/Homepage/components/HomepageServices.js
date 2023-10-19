import { HStack, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";

const HomepageServices = () => {
  return (
    <>
      <HStack
        width={"100%"}
        padding={"20px 15px 20px 15px"}
        backgroundColor={"#EAEDEF"}
        flexDirection={{ base: "column-reverse", md: "row", lg: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        id="homepage-services"
      >
        <Stack width={"100%"}>
          <Heading
            color={"black"}
            fontSize={{ base: "1.4rem", md: "1.7rem", lg: "3rem" }}
            fontWeight={"medium"}
            textAlign={"center"}
          >
            Services
          </Heading>
          <Text
            color={"black"}
            fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
            textAlign={"justify"}
          >
            The main objective of our platform is to support new startups and
            small-scale businesses by connecting them with the right investors
            to solve their problems related to funding.
          </Text>
        </Stack>
        <Stack width={"40%"} alignItems={"center"} justifyContent={"center"}>
          <Stack
            width={{ base: "130px", md: "180px", lg: "300px" }}
            height={{ base: "130px", md: "180px", lg: "300px" }}
            backgroundSize={"100% 100%"}
            backgroundImage="url('/images/homepage-services-image.png')"
            marginBottom={{ base: 10, md: 0, lg: 0 }}
          ></Stack>
        </Stack>
      </HStack>
    </>
  );
};

export default HomepageServices;
