import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HStack,
  Heading,
  Stack,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import "../../css/reusable.css";
// import "../../css/Homepage/Homepage.css";npm install @chakra-ui/icons
import HomepageTitle from "./components/HomepageTitle";
import HomepageAboutus from "./components/HomepageAboutus";
import HomepageServices from "./components/HomepageServices";

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
    // <>
    //   <div className="main">
    //     <div className="homepage-main">
    //       {/* Header */}
    //       <div className="homepage-header flex flex-row align-center justify-center">
    //         <div className="homepage-header-logo-section flex flex-row align-center justify-start">
    //           <div className="homepage-logo"></div>
    //         </div>
    //         <div className="homepage-header-navigationButtons-section flex flex-row align-center justify-center ">
    //           <ul className="flex flex-row align-center justify-center">
    //             {navigationButtons.map((item) => (
    //               <li
    //                 key={item.id}
    //                 className="flex align-center justify-center"
    //               >
    //                 <a href={item.link}>{item.title}</a>
    //               </li>
    //             ))}
    //           </ul>
    //           <button
    //             className="getstarted-button"
    //             onClick={() => navigate("/user-login")}
    //           >
    //             Get Started
    //           </button>
    //         </div>
    //       </div>
    //       {/* Title section */}
    //       <HomepageTitle />
    //       {/* Aboutus section */}
    //       <HomepageAboutus />
    //       {/* Services section */}
    //       <HomepageServices />
    //       {/* Footer */}
    //       <div className="homepage-footer flex flex-row align-center justify-center">
    //         <div className="homepage-footer-logo-section flex flex-row align-center justify-start">
    //           <div className="homepage-footer-logo"></div>
    //         </div>
    //         <div className="homepage-footer-text-section flex flex-column align-center justify-start">
    //           <h2 className="homepage-footer-text-heading">Investify</h2>
    //           <ul>
    //             {navigationButtons.map((item) => (
    //               <li
    //                 key={item.id}
    //                 className="flex align-center justify-center"
    //               >
    //                 <a href={item.link}>{item.title}</a>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //         <div className="homepage-footer-social-section flex flex-row align-center justify-center">
    //           <div className="homepage-footer-social-icons insta"></div>
    //           <div className="homepage-footer-social-icons fb"></div>
    //           <div className="homepage-footer-social-icons whatsapp"></div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </>
    <>
      <Stack className="main">
        <Stack width={"100%"} spacing={0}>
          <HStack
            width={"100%"}
            padding={"10px 5px 10px 5px"}
            bgGradient="linear(to-r, #42B2FE, #001F44)"
            position={"sticky"}
            top={0}
            zIndex={3}
          >
            <Stack
           
              width={{base:"20%", md:"30%", lg:"50%"}}

              alignItems={"center"}
              justifyContent={"start"}
              flexDirection={"row"}
            >
              <Stack
                height={{base:"30px", md:"60px", lg:"60px"}}
                width={{base:"30px", md:"50px", lg:"50px"}}
                backgroundImage="url('/images/logo.png')"
                backgroundSize={"100% 100%"}
              ></Stack>
            </Stack>
            <Stack

              width={{base:"80%", md:"70%", lg:"50%"}}

              alignItems={"center"}
              justifyContent={"center"}
            >
              <UnorderedList
                style={{ display: "flex", flexDirection: "row" }}
                width={"60%"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                {navigationButtons.map((item) => (
                  <ListItem
                    key={item.id}
              marginLeft={{base:"10px", md:"15px", lg:"25px"}}
              marginRight={{base:"10px", md:"15px", lg:"25px"}}
                  fontSize={{base:"0.8rem",md:"1rem", lg:"1rem"}}
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
              <Button colorScheme="gray" rightIcon={<ArrowForwardIcon />} marginRight={"10px"}>
                Get Started
              </Button>
            </Stack>
          </HStack>
          {/* Title section */}
          <HomepageTitle />
          {/* Aboutus section */}
          <HomepageAboutus />
          {/* Services section */}
          <HomepageServices />
        </Stack>
      </Stack>
    </>
  );
};

export default Homepage;
