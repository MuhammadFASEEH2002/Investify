import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";

import { useNavigate } from "react-router-dom";
         

import {
  HStack,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Box,
  StackDivider,
  Link,
  Select,
  Center,
  Textarea,

} from "@chakra-ui/react";


const Investeedashboardlistingcreation = () => {
  const [description, setDescription] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [amount, setAmount] = useState("");
  const toast = useToast();
  const navigate = useNavigate();


  const createListing = () => {
    const formData = new FormData()
    formData.append('description', description);
    formData.append('profitPercentage', profitPercentage);
    formData.append('amount', amount);
    // console.log({
    //   businessName,
    //   email,
    //   cnic,
    //   password,
    //   address,
    //   zipcode,
    //   phoneNumber,
    //   selectedCity,
    //   selectedCountry,
    //   selectedCategory,
    //   file
    // });
    if (
      description && profitPercentage && amount
    ) {
      fetch("http://127.0.0.1:3001/api/investee/create-listing", {
        method: "POST",
        body: formData,

        // headers: {
        //   Accept: "application/json",
        //   "Content-Type": "application/json",
        // },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status) {
            toast({
              title: "Listing Created",
              description: "Redirecting to Login Screen",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          } else {
            // alert(res.message);
            toast({
              title: "Authentication Error",
              description: res.message,
              status: "error",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
          }
        })
        .catch((err) => console.log(err));
    }
    else {
      toast({
        title: "Fields Are Empty",
        description: "Kindly fill all the fields with correct data",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
    <>
      <Sidebar>
        <HStack
          width={"100%"}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          spacing={"0px"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Stack width={{ base: "100%", md: "50%", lg: "50%" }} spacing={"0px"} alignItems={"center"} justifyContent={"center"}>
            <HStack width={"100%"}>
              <Stack width={"100%"}>
                <Text>Business Description</Text>
                <Textarea
                  placeholder="Describe your business in not more than 200 words."
                  width={"90%"}
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                />
              </Stack>
            </HStack>
            <HStack width={"100%"}>
              <Stack width={"100%"}>
                <Text>Profit Share Percentage</Text>
                <Input
                  type="number"
                  placeholder="should not be more than 30%"
                  width={"90%"}
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                // onChange={(event) => handleInputChange(event, setPhoneNumber)}
                />
              </Stack>
            </HStack>

            <HStack width={"100%"}>
              <Stack width={"100%"}>
                <Text>Amount Required</Text>
                <Input
                  type="number"
                  placeholder="max amount allowed is Rs 25,000"
                  width={"90%"}
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                // onChange={(event) => handleInputChange(event, setCnic)}
                />
              </Stack>
            </HStack>
            <Button
              colorScheme="teal"
              variant="solid"
              marginTop={"30px"}
              size={{ base: "md", md: "md", lg: "lg" }}
            onClick={createListing}
            >
              Create
            </Button>
          </Stack>

        </HStack>
      </Sidebar>
    </>
  );
};

export default Investeedashboardlistingcreation;
