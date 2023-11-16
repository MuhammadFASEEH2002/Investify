import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import {
  HStack,
  Heading,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  Box,
  StackDivider,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { wrap } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Admindashboardaccountverification = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [investee, setInvestee] = useState([]);
  useEffect(() => {
    document.title = "Investify | Admin-Account Verification";

    // Fetch the data from the backend API endpoint
    fetch("http://localhost:3001/api/admin/get-investees", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setInvestee(data.investee))
      .catch((err) => console.log(err));
  }, []);
  const approve = (User) => {};
  return (
    <>
      <Sidebar>
        <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
          }}
        >
          {investee?.map((item) => (
            <Card align="center" width={"350px"} margin={"10px"}>
              <CardHeader>
                <Heading size="md">{item.businessName}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Category : </span>
                  {item.category}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Email : </span>
                  {item.email}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Address : </span>
                  {item.address}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Zipcode : </span>
                  {item.zipcode}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Phone Number : </span>
                  {item.phoneNumber}
                </Text>
                <Text>
                  <span style={{ fontWeight: "bold" }}>Country,City : </span>
                  {item.country},{item.city}
                </Text>
              </CardBody>
              <CardFooter>
                <Button colorScheme="gray" margin={"10px"}>
                  Decline
                </Button>
                <Button
                  colorScheme="blue"
                  margin={"10px"}
                  onClick={approve(item._id)}
                >
                  Approve
                </Button>
              </CardFooter>
            </Card>
          ))}
        </Box>
      </Sidebar>
    </>
  );
};

export default Admindashboardaccountverification;
