import React from "react";
import Sidebar from "./components/Sidebar";
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
  Textarea
} from "@chakra-ui/react";

const Investeedashboardlistingcreation = () => {
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
          // onClick={register}
        >
          Register
        </Button>
          </Stack>
         
        </HStack>
      </Sidebar>
    </>
  );
};

export default Investeedashboardlistingcreation;
