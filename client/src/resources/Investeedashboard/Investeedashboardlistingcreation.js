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
  Spinner,
  Heading
} from "@chakra-ui/react";


const Investeedashboardlistingcreation = () => {
  const [description, setDescription] = useState("");
  const [profitPercentage, setProfitPercentage] = useState("");
  const [investmentDuration, setInvestmentDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true)
    const token = window.localStorage.getItem('token');
    if (
      description && profitPercentage && amount && investmentDuration
    ) {
      fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/create-listing`, {
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
            setLoading(false)
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
      setLoading(false)

    }
  };
  return (
    <>
      <Sidebar>
      <Heading textAlign={"center"}>Create Listing</Heading>

        {loading ? (<><Stack minHeight={'100%'} width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack> </>):(<>
          <HStack
            width={"100%"}
            flexDirection={{ base: "column", md: "row", lg: "row" }}
            spacing={"0px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Stack width={{ base: "100%", md: "50%", lg: "50%" }} spacing={"0px"} alignItems={"center"} justifyContent={"center"}>
              <HStack width={"100%"} marginBottom={5}>
                <Stack width={"100%"}>
                  <Text>Business Description</Text>
                  <Textarea
                    placeholder="Describe your business in not more than 200 words. Details should include about past months profit, your future goals like where this investment will be used."
                    width={"90%"}
                    variant={"filled"}
                    border={"0.5px solid grey"}
                    onChange={(event) =>
                      handleInputChange(event, setDescription)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        createListing()
                      }
                    }}
                    isRequired
                  />
                </Stack>
              </HStack>
              <HStack width={"100%"} marginBottom={5}>
                <Stack width={"100%"}>
                  <Text>Profit Share Percentage</Text>
                  <Input
                    type="number"
                    placeholder="should be between 5% to 15%"
                    width={"90%"}
                    variant={"filled"}
                    border={"0.5px solid grey"}
                    isRequired
                    onKeyDown={(event) => {checkIfNumber(event)
                      if (event.key === "Enter") {
                        createListing()
                      }}}
                    onChange={(event) => handleInputChange(event, setProfitPercentage)}
                  />
                </Stack>
              </HStack>
              <HStack width={"100%"} marginBottom={5}>
                <Stack width={"100%"}>
                  <Text>Investment Duration</Text>
                  <Input
                    type="number"
                    placeholder="Enter the duration of investment in years between 1 - 3"
                    width={"90%"}
                    variant={"filled"}
                    border={"0.5px solid grey"}
                    isRequired
                    onKeyDown={(event) => {checkIfNumber(event)
                      if (event.key === "Enter") {
                        createListing()
                      }}}
                    onChange={(event) => handleInputChange(event, setInvestmentDuration)}
                  />
                </Stack>
              </HStack>
              <HStack width={"100%"} marginBottom={5}>
                <Stack width={"100%"}>
                  <Text>Amount Required</Text>
                  <Input
                    type="number"
                    placeholder="max amount allowed is Rs 25,000"
                    width={"90%"}
                    variant={"filled"}
                    border={"0.5px solid grey"}
                    isRequired
                    onKeyDown={(event) => {checkIfNumber(event)
                      if (event.key === "Enter") {
                        createListing()
                      }}}
                    onChange={(event) => handleInputChange(event, setAmount)}
                  />
                </Stack>
              </HStack>
              <Button
                colorScheme="teal"
                variant="solid"
                marginTop={"30px"}
                size={{ base: "md", md: "md", lg: "lg" }}
                onClick={()=>{createListing()}}
              >
                Create Listing
              </Button>
            </Stack>

          </HStack></>)}

      </Sidebar>
    </>
  );
};

export default Investeedashboardlistingcreation;
