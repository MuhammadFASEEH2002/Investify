import React, { useState } from "react";
import {
  HStack,
  Stack,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Checkbox
} from "@chakra-ui/react";

const Investeeregistration = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [checkbox, setCheckbox] = useState(false);


  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  // const handleCityChange = (event) => {
  //   setSelectedCity(event.target.value);
  // };
  // const handleCountryChange = (event) => {
  //   setSelectedCountry(event.target.value);
  // };
  // const handleCategoryChange = (event) => {
  //   setSelectedCountry(event.target.value);
  // };
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleConfirmPasswordClick = () =>{
    setShowConfirmPassword(!showConfirmPassword);
  }
  const register = () => {}
  return (
    <>
      <HStack width={"100%"}>
        <Stack width={"50%"}>
          <HStack marginLeft={"20px"}>
            <Stack width={"50%"}>
              <Text>Business Name</Text>
              <Input
                type="text"
                placeholder="e.g SZAB Tech"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
                onChange={(event) => handleInputChange(event, setBusinessName)}
                
              />
            </Stack>
            <Stack width={"50%"}>
              <Text>Email</Text>
              <Input
                type="email"
                placeholder="e.g faseeh@gmail.com"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
                onChange={(event) => handleInputChange(event, setEmail)}

              />
            </Stack>
          </HStack>
          <HStack marginLeft={"20px"}>
            <Stack width={"50%"}>
              <Text>Phone Number</Text>
              <Input
                type="number"
                placeholder="e.g 03001123456"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
                onChange={(event) => handleInputChange(event, setPhoneNumber)}
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
                onChange={(event) => handleInputChange(event, setCnic)}

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
                onChange={(event) => handleInputChange(event, setPassword)}

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
                onChange={(event) => handleInputChange(event, setConfirmPassword)}

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
              <Text>Address</Text>
              <Input
                type="text"
                placeholder="e.g 03001123456"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
                onChange={(event) => handleInputChange(event, setAddress)}

              />
            </Stack>
            <Stack width={"50%"}>
              <Text>Zip Code</Text>
              <Input
                type="number"
                placeholder="e.g 74600"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
                onChange={(event) => handleInputChange(event, setZipcode)}
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
                isRequired
                onChange={(event) => handleInputChange(event, setSelectedCity)}

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
                onChange={(event) => handleInputChange(event, setSelectedCountry)}

                isRequired
              >
                <option value="Pakistan">Pakistan</option>
              </Select>
            </Stack>
          </HStack>
          <HStack width={"100%"}>
            <Stack width={"50%"}>
              <Text>Category</Text>
              <Select
                placeholder="Select Country"
                variant={"outline"}
                border={"0.5px solid grey"}
                width={"90%"}
                onChange={(event) => handleInputChange(event, setSelectedCategory)}

                isRequired
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Informmation Technology (IT)">Informmation Technology (IT)</option>
                <option value="Retail Business">Retail Business</option>

              </Select>
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Checkbox
             onChange={(event) => handleInputChange(event, setCheckbox)}
             checked={setCheckbox}> I agree to Investify terms and conditions</Checkbox>
        <Button
          colorScheme="teal"
          variant="solid"
          marginRight={"10px"}
          size={{ base: "md", md: "md", lg: "lg" }}
          onClick={register}
        >
          Register
        </Button>
      </Stack>
    </>
  );
};

export default Investeeregistration;
