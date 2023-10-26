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
  Checkbox,
} from "@chakra-ui/react";

const Investorregistration = () => {
  // Input field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [checkbox, setCheckbox] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const handleCheckboxChange = (event, setState) => {
    setState(event.target.checked);
  };
  // const handleCityChange = (event) => {
  //   setSelectedCity(event.target.value);
  // };
  // const handleCountryChange = (event) => {
  //   setSelectedCountry(event.target.value);
  // };
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
    const handleDOBChange = (event) => {
      const inputDate = event.target.value;
      const currentDate = new Date();
  
      // Convert inputDate to a Date object
      const enteredDate = new Date(inputDate);
  
      // Calculate the age difference in milliseconds
      const ageDifference = currentDate - enteredDate;
  
      // Calculate the age in years
      const ageInYears = ageDifference / (1000 * 60 * 60 * 24 * 365.25);
  
      // Check if the age is greater than or equal to 18
      if (ageInYears >= 18) {
        // Person is above 18 years old
        setDateOfBirth(inputDate);
        console.log("Valid date of birth");
      } else {
        // Person is below 18 years old
        console.log("Invalid date of birth. Must be above 18 years old.");
      }
    };
    const register = () => {
      // console.log({
      //   firstName,
      //   lastName,
      //   password,
      //   email,
      //   cnic,
      //   password,
      //   dateOfBirth,
      //   phoneNumber,
      //   selectedCity,
      //   selectedCountry,
      // });
      if (
        firstName &&
        lastName &&
        email &&
        cnic &&
        password &&
        confirmPassword &&
        phoneNumber &&
        dateOfBirth &&
        selectedCity &&
       checkbox &&
        selectedCountry
      ) {
        if (password === confirmPassword) {
          fetch("http://localhost:3001/Auth/investor-registration", {
            method: "POST",
            body: JSON.stringify({
              firstName,
              lastName,
              password,
              email,
              cnic,
              dateOfBirth,
              phoneNumber,
              selectedCity,
              selectedCountry,
            }),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          })
            .then((res) => {
              return res.json()
            })
            .then((res) => {
              if (res.status) {
                // window.localStorage.setItem("token", res.token);
                alert("you have registered");
              }else{
                alert(res.message)
              }
            })
            .catch((err) => alert(err));
        } else {
          alert("Password doesnot match");
        }
      } else {
        alert("Fields are empty");
      }
    };
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
                onChange={(event) => handleInputChange(event, setFirstName)}
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
                onChange={(event) => handleInputChange(event, setLastName)}
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
                onChange={(event) => handleInputChange(event, setEmail)}
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
                  onChange={(event) =>
                    handleInputChange(event, setConfirmPassword)
                  }
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
                onChange={(event) => handleInputChange(event, setPhoneNumber)}
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
                onChange={(event) => handleInputChange(event, setDateOfBirth)}
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
                onChange={(event) => handleInputChange(event, setSelectedCity)}
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
                onChange={(event) =>
                  handleInputChange(event, setSelectedCountry)
                }
                isRequired
              >
                <option value="Pakistan">Pakistan</option>
              </Select>
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <Checkbox
          onChange={(event) => handleCheckboxChange(event, setCheckbox)}
          checked={setCheckbox}
        >
          I agree to Investify terms and conditions
        </Checkbox>
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

export default Investorregistration;
