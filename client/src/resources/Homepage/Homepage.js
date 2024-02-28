import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HStack,
  Heading,
  Stack,
  UnorderedList,
  ListItem,
  Link,
  Button,
  VStack,
  Text
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import HomepageTitle from "./components/HomepageTitle";
import HomepageAboutus from "./components/HomepageAboutus";
import HomepageServices from "./components/HomepageServices";
import Logo from "../../components/Logo";

const navigationButtons = [
  { id: 1, link: "#homepage-title", title: "Home" },
  { id: 2, link: "#homepage-aboutus", title: "About Us" },
  { id: 3, link: "#homepage-services", title: "Services" },
];

const Homepage = () => {
  useEffect(() => {
    document.title = "Investify | Homepage";
  });
  const navigate = useNavigate();

  return (
    <>
      <Stack

        overflowX={"hidden"}
        width={"100svw"}
        height={"100svh"}
      >
        <Stack width={"100%"} spacing={"0px"}>
          <HStack
            width={"100%"}
            padding={"10px 5px 10px 5px"}
            bgGradient="linear(to-r, #42B2FE, #001F44)"
            position={"sticky"}
            top={0}
            zIndex={3}
          >
            <Stack
              width={{ base: "20%", md: "30%", lg: "50%" }}
              alignItems={"center"}
              justifyContent={"start"}
              flexDirection={"row"}
            >
              <Logo />
            </Stack>
            <Stack
              width={{ base: "80%", md: "70%", lg: "50%" }}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <UnorderedList
                style={{ display: "flex", flexDirection: "row" }}
                width={"100%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {navigationButtons.map((item) => (
                  <ListItem
                    key={item.id}
                    marginLeft={{ base: "10px", md: "15px", lg: "25px" }}
                    marginRight={{ base: "10px", md: "15px", lg: "25px" }}
                    fontSize={{ base: "0.7rem", md: "1rem", lg: "1rem" }}
                    listStyleType={"none"}
                  >
                    <Link
                      href={item.link}
                      textDecoration={"none"}
                      color={"white"}
                    >
                      {item.title}
                    </Link>
                  </ListItem>
                ))}
              </UnorderedList>
            </Stack>
            <Stack alignItems={"flex-start"}>
              <Button
                colorScheme="gray"
                rightIcon={<ArrowForwardIcon />}
                marginRight={"10px"}
                size={{ base: "sm", md: "sm", lg: "md" }}
                onClick={() => navigate("/user-login")}
              >
                Explore
              </Button>
            </Stack>
          </HStack>
          {/* Title section */}
          <HomepageTitle />
          {/* Aboutus section */}
          <HomepageAboutus />
          {/* Services section */}
          <HomepageServices />
          <VStack
            bgGradient="linear(to-r, #42B2FE, #001F44)"
          >
            <HStack
              width={"100%"}
              bgGradient="linear(to-r, #42B2FE, #001F44)"
              padding={"20px 15px 20px 15px"}
              flexDirection={{ base: "column", md: "row", lg: "row" }}
            >
              <Stack
                width={"30%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Stack
                  width={{ base: "80px", md: "100px", lg: "150px" }}
                  height={{ base: "80px", md: "100px", lg: "150px" }}
                  backgroundSize={"100% 100%"}
                  backgroundImage="url('/images/logo.png')"
                ></Stack>
              </Stack>
              <Stack
                width={"40%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Heading size={"lg"} color={"white"} width={"100%"} textAlign={"center"}>
                  Investify
                </Heading>
                <UnorderedList
                  style={{ display: "flex", flexDirection: "column" }}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {navigationButtons.map((item) => (
                    <ListItem
                      key={item.id}
                      fontSize={{ base: "0.7rem", md: "1rem", lg: "1rem" }}
                      listStyleType={"none"}
                    >
                      <Link
                        href={item.link}
                        textDecoration={"none"}
                        color={"white"}
                      >
                        {item.title}
                      </Link>
                    </ListItem>
                  ))}
                </UnorderedList>
              </Stack>
              <HStack
                width={"30%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Stack
                  width={{ base: "20px", md: "30px", lg: "40px" }}
                  height={{ base: "20px", md: "30px", lg: "40px" }}
                  backgroundSize={"100% 100%"}
                  backgroundImage="url('/images/whatsapp.png')"
                ></Stack>
                <Stack
                  width={{ base: "20px", md: "30px", lg: "40px" }}
                  height={{ base: "20px", md: "30px", lg: "40px" }}
                  backgroundSize={"100% 100%"}
                  backgroundImage="url('/images/fb.png')"
                ></Stack>
                <Stack
                  width={{ base: "20px", md: "30px", lg: "40px" }}
                  height={{ base: "20px", md: "30px", lg: "40px" }}
                  backgroundSize={"100% 100%"}
                  backgroundImage="url('/images/insta.png')"
                ></Stack>
              </HStack>
            </HStack>
            <Text color={"white"}>© {Date().split(" ")[3]} Investify. All rights reserved</Text>
          </VStack>

        </Stack>
      </Stack>
    </>
  );
};

export default Homepage;
