import { HStack, Stack, Heading, Text } from "@chakra-ui/react";
import React from "react";

const HomepageAboutus = () => {
  return (
    <>
      <HStack
        width={"100%"}
        padding={"20px 15px 20px 15px"}
        bgGradient="linear(to-r, #42B2FE, #001F44)"
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        id="homepage-aboutus"
      >
        <Stack width={"40%"} alignItems={"center"} justifyContent={"center"}>
          <Stack
            width={{ base: "130px", md: "180px", lg: "300px" }}
            height={{ base: "130px", md: "180px", lg: "300px" }}
            backgroundSize={"100% 100%"}
            backgroundImage="url('/images/homepage-aboutus-image.png')"
            marginBottom={{ base: 10, md: 0, lg: 0 }}
          ></Stack>
        </Stack>
        <Stack width={"100%"}>
          <Heading
            color={"white"}
            fontSize={{ base: "1.4rem", md: "1.7rem", lg: "3rem" }}
            fontWeight={"medium"}
            textAlign={"center"}
          >
            About Us
          </Heading>
          <Text
            color={"white"}
            fontSize={{ base: "0.8rem", md: "1rem", lg: "1.5rem" }}
            textAlign={"justify"}
          >
            Investify is an online platform that facilitates and investment
            opportunities. The platform provides a space for business owners
            looking for potential investors. Likewise, investors can search for
            businesses that match their investment criteria. Our platform aims
            to provide a seamless solution for entrepreneurs to list their
            businesses and seek investments. It will bridge the gap between
            ambitious entrepreneurs and potential investors
          </Text>
        </Stack>
      </HStack>
    </>
  );
};

export default HomepageAboutus;
