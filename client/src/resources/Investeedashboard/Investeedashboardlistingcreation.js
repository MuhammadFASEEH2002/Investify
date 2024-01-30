import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import { useNavigate } from "react-router-dom";
import {
  HStack,
  Stack,
  Text,
  Button,
  Input,
  useToast,
  Textarea,
} from "@chakra-ui/react";


const Investeedashboardlistingcreation = () => {
  const [description, setDescription] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [amount, setAmount] = useState("");
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const checkIfNumber = (event) => {
    const regex = new RegExp(/(^\d*$)|(Backspace|Tab|Delete|ArrowLeft|ArrowRight)/);
    return !event.key.match(regex) && event.preventDefault();
  }

  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      document.title = "Investify | Investee-Listing Creation";
    } else {
      navigate("/user-login");
    }
  }, []);
  const createListing = () => {
    const token = window.localStorage.getItem('token');
    // console.log({
    //   description, profitPercentage, amount
    // });
    if (
      description && profitPercentage && amount && investmentDuration
    ) {
      fetch("http://127.0.0.1:3001/api/investee/create-listing", {
        method: "POST",
        body: JSON.stringify({
          description, profitPercentage, amount, investmentDuration
        }),
        headers: {
          'token': token,
          'Accept': "application/json",
          "Content-Type": "application/json",
        },

      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          if (res.status) {
            toast({
              title: "Listing Created",
              description: "Awaiting for admin approval",
              status: "success",
              duration: 9000,
              isClosable: true,
              position: "top",
            });
            navigate("/user/investee-dashboard/home");
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
                  onChange={(event) =>
                    handleInputChange(event, setDescription)
                  }
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
                  onKeyDown={(event) => checkIfNumber(event)}
                  onChange={(event) => handleInputChange(event, setProfitPercentage)}
                />
              </Stack>
            </HStack>
            <HStack width={"100%"}>
              <Stack width={"100%"}>
                <Text>Investment Duration</Text>
                <Input
                  type="number"
                  placeholder="Enter the duration of investment in years"
                  width={"90%"}
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                  onKeyDown={(event) => checkIfNumber(event)}
                  onChange={(event) => handleInputChange(event, setInvestmentDuration)}
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
                  onKeyDown={(event) => checkIfNumber(event)}
                  onChange={(event) => handleInputChange(event, setAmount)}
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
              Create Listing
            </Button>
          </Stack>

        </HStack>
      </Sidebar>
    </>
  );
};

export default Investeedashboardlistingcreation;
