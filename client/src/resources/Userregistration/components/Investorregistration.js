import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  useToast,
  Spinner
} from "@chakra-ui/react";

const Investorregistration = () => {
  const toast = useToast();
  // Input field states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [checkbox, setCheckbox] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();

  // Input State change handling fucntions
  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const handleCheckboxChange = (event, setState) => {
    setState(event.target.checked);
  };
  const nameRegex = /^[A-Za-z]+$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const cnicRegex = /^\d{13}$/;
  const phoneNumberRegex = /^0\d{10}$/;
  const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirmPasswordClick = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const register = () => {
    if (
      firstName &&
      lastName &&
      email &&
      cnic &&
      password &&
      confirmPassword &&
      phoneNumber &&
      selectedCity &&
      checkbox &&
      selectedCountry
    ) {
      setLoading(true)
      if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {

        toast({
          title: "Inappropriate First Name or Last Name",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)
        return
      }

      if (!emailRegex.test(email)) {

        toast({
          title: "Invalid Email Address",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)

        return
      }
      if (!cnicRegex.test(cnic)) {
        toast({
          title: "Invalid Format of CNIC or not in 13 digits",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)

        return
      }

      if (!phoneNumberRegex.test(phoneNumber)) {
        toast({
          title: "Invalid Phone Number",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)

        return
      }

      if (!passwordRegex.test(password) || !passwordRegex.test(confirmPassword)) {
        toast({
          title: "Invalid Password",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)

        return
      }

      if (password === confirmPassword) {
        fetch(`${process.env.REACT_APP_FETCH_URL_}/api/auth/investor-registration`, {
          method: "POST",
          body: JSON.stringify({
            firstName,
            lastName,
            password,
            email,
            cnic,
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
            return res.json();
          })
          .then((res) => {
            if (res.status) {
              toast({
                title: "Investor Account Created",
                description: "Redirecting to Login Screen",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top",
              });
              setTimeout(() => {
                navigate("/user-login");
              }, 2000);
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
          .catch((err) => alert(err));
      } else {
        // alert("Password doesnot match");
        toast({
          title: "Passwords Doesnot Match",
          description: "Both passwords should be same",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)

      }
    } else {
      // alert("Fields are empty");
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
      {loading ? (<><Stack width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack></>) : (<>    <HStack
        width={"100%"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
      >
        <Stack width={{ base: "100%", md: "50%", lg: "50%" }}>
          <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
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
          <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
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
          <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
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
                <InputRightElement width="4rem">
                  <Button h="1.5rem" size="xs" onClick={handlePasswordClick}>
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
                <InputRightElement width="4rem">
                  <Button
                    h="1.5rem"
                    size="xs"
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
        <Stack width={{ base: "100%", md: "50%", lg: "50%" }} height={"100%"}>
          <HStack
            width={"100%"}
            marginLeft={{ base: "10px", md: "0px", lg: "0px" }}
          >
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
              <Text>City</Text>
              <Select
                placeholder="Select City"
                variant={"filled"}
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
          </HStack>
          <HStack
            width={"100%"}
            marginLeft={{ base: "10px", md: "0px", lg: "0px" }}
          >
            <Stack width={"50%"}>
              <Text>Country</Text>
              <Select
                placeholder="Select Country"
                border={"0.5px solid grey"}
                width={"90%"}
                variant={"filled"}
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
        <Stack alignItems={"center"} justifyContent={"center"} marginTop={"30px"}>
          <Checkbox
            onChange={(event) => handleCheckboxChange(event, setCheckbox)}
            checked={setCheckbox}
            borderColor="black"
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
        </Stack></>)}

    </>
  );
};

export default Investorregistration;
