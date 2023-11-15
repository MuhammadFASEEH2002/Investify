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
      .then((data) =>  setInvestee(data.investee))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Sidebar>
        <Box
          style={{
            display: "flex",
            flexWrap: wrap,
            alignContent: "flex-start",
          }}
        >
          {/* {data.map(item => (
          <li key={item._id}>{item.name}</li>
        ))} */}
          {investee?.map((item) => (
            <Card key={item._id}>
              <CardBody>
                <Text>{item.businessName}</Text>
              </CardBody>
            </Card>
          ))}
        </Box>
      </Sidebar>
    </>
  );
};

export default Admindashboardaccountverification;
