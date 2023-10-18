import React from "react";
import { HStack, Heading, Stack } from "@chakra-ui/react";

const HomepageTitle = () => {
  return (
    //   <div
    //   className="homepage-title flex flex-row align-center justify-center"
    //   id="homepage-title"
    // >
    //   <div className="homepage-title-image-section">
    //     <div className="homepage-title-image"></div>
    //   </div>
    //   <div className="homepage-title-text-section flex flex-column align-center justify-center">
    //     <h1 className="homepage-title-text">INVESTIFY</h1>
    //     <h1 className="homepage-title-subtext">
    //       Your Gateway to Business Investment Opportunities
    //     </h1>
    //   </div>

    // </div>
    <>
      <HStack
        width={"100%"}
        padding={"20px 15px 20px 15px"}

        backgroundColor={"#EAEDEF"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Stack width={"40%"} alignItems={"center"} justifyContent={"center"}>
          <Stack
            width={{ base: 130, md: 180, lg: 300 }}
            height={{ base: 130, md: 180, lg: 300 }}
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
