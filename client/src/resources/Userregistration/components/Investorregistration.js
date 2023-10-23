import React, { useState, useEffect } from "react";
import {
  HStack,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
} from "@chakra-ui/react";


const Investorregistration = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };
  const [selectedCountry, setSelectedCountry] = useState("");
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  // useEffect(() => {
  //   console.log(selectedCity);
  //   console.log(selectedCountry);
  // });
  return (
    <>
      <HStack width={"100%"}>
        <Stack width={"50%"}>
          <HStack marginLeft={"20px"}>
            <Stack width={"50%"}>
              <Text>First Name</Text>
              <Input
                type="text"
                placeholder="e.g Muhammad"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
              />
            </Stack>
            <Stack width={"50%"}>
              <Text>Last Name</Text>
              <Input
                type="text"
                placeholder="e.g Faseeh"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
              />
            </Stack>
          </HStack>
          <HStack marginLeft={"20px"}>
            <Stack width={"50%"}>
              <Text>Email</Text>
              <Input
                type="email"
                placeholder="e.g faseeh@gmail.com"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
              />
            </Stack>
            <Stack width={"50%"}>
              <Text>CNIC</Text>
              <Input
                type="number"
                placeholder="e.g 4210111234567"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
              />
            </Stack>
          </HStack>
          <HStack marginLeft={"20px"}>
            <Stack width={"50%"}>
              <Text>Password</Text>
              <InputGroup width={"90%"}>
                <Input
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handlePasswordClick}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Stack width={"50%"}>
              <Text>Confirm Password</Text>
              <InputGroup width={"90%"}>
                <Input
                  pr="4.5rem"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password"
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleConfirmPasswordClick}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </HStack>
        </Stack>
        {/* registeration form right area */}

        <Stack
          width={"50%"}
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          <HStack width={"100%"}>
            <Stack width={"50%"}>
              <Text>Phone Number</Text>
              <Input
                type="number"
                placeholder="e.g 03001123456"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
              />
            </Stack>
            <Stack width={"50%"}>
              <Text>Date of Birth</Text>
              <Input
                type="date"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
              />
            </Stack>
          </HStack>
          <HStack width={"100%"}>
            <Stack width={"50%"}>
              <Text>City</Text>
              <Select
                placeholder="Select City"
                variant={"outline"}
                border={"0.5px solid grey"}
                width={"90%"}
                onChange={handleCityChange}
                isRequired
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
              </Select>
            </Stack>
            <Stack width={"50%"}>
              <Text>Country</Text>
              <Select
                placeholder="Select Country"
                variant={"outline"}
                border={"0.5px solid grey"}
                width={"90%"}
                onChange={handleCountryChange}
                isRequired
              >
                <option value="Pakistan">Pakistan</option>
              
              </Select>
            </Stack>
          </HStack>
        </Stack>
      </HStack>
    </>
  );
};

export default Investorregistration;
