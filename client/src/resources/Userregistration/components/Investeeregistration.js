import React, { useEffect, useState } from "react";
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
  Spinner,
  Tooltip
} from "@chakra-ui/react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../utils/firebase";


const Investeeregistration = () => {
  // useEffect(() => {
  //   setLoading(true)
  // }, []);
  const toast = useToast();
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
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);


  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const handleCheckboxChange = (event, setState) => {
    setState(event.target.checked);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handlePasswordClick = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleConfirmPasswordClick = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const cnicRegex = /^\d{13}$/;
  const phoneNumberRegex = /^0\d{10}$/;
  const zipcodeRegex = /^\d{5}$/;
  const businessNameRegex = /^[a-zA-Z0-9\s]+$/;
  const passwordRegex = /^(?=.*[A-Za-z0-9])(?!.*\s).{8,}$/;

  async function register() {

    if (
      businessName &&
      email &&
      cnic &&
      password &&
      address &&
      zipcode &&
      phoneNumber &&
      selectedCity &&
      selectedCountry &&
      selectedCategory &&
      checkbox && file
    ) {
      setLoading(true)
      // console.log(formData)
      if (!emailRegex.test(email)) {

        toast({
          title: "Invalid Email Address Format",
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
      if (!zipcodeRegex.test(zipcode)) {
        toast({
          title: "Invalid Zipcode.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)

        return
      }
      if (!businessNameRegex.test(businessName)) {
        toast({
          title: "Inappropriate name for a business",
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
          title: "Password should have minimum 8 characters. No spaces allowed and at least 1 alphabet or letter is compulsory",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
        setLoading(false)

        return
      }
      if (password === confirmPassword) {
        const fileRef = ref(storage, `upload/verification_docs/${Date.now() + file.name}`);
        // formData.append('fileRef', url);
        await uploadBytes(fileRef, file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setUrl(url)
            fetch(`${process.env.REACT_APP_FETCH_URL_}/api/auth/investee-registration`, {
              method: "POST",
              body: JSON.stringify({
                businessName,
                email,
                cnic,
                password,
                confirmPassword,
                address,
                zipcode,
                phoneNumber,
                selectedCity,
                selectedCountry,
                selectedCategory,
                url
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
                    title: "Investee Account Created",
                    description: "Redirecting to Login Screen",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                  });
                  navigate("/user-login");
                } else {
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
          });

        });

      } else {
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
      {loading ? (<>
        <Stack width={'100%'} alignItems={"center"} justifyContent={"center"} ><Spinner size='xl' /></Stack>
      </>) : (<>
        <HStack
          width={"100%"}
          flexDirection={{ base: "column", md: "row", lg: "row" }}
          spacing={"0px"}
        >
          <Stack width={{ base: "100%", md: "50%", lg: "50%" }} spacing={"0px"}>
            <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }} marginBottom={"10px"}>
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
            <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }} marginBottom={"10px"}>
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
            <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }} marginBottom={"10px"}>
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
            width={{ base: "100%", md: "50%", lg: "50%" }}
            justifyContent={"center"}
            alignItems={"flex-start"}
            spacing={"0px"}
          >
            <HStack
              width={"100%"}
              marginLeft={{ base: "10px", md: "0px", lg: "0px" }}
              marginBottom={"10px"}
            >
              <Stack width={"50%"}>
                <Text>Address</Text>
                <Input
                  type="text"
                  placeholder="e.g: Plot no, street number, area."
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
            <HStack
              width={"100%"}
              marginLeft={{ base: "10px", md: "0px", lg: "0px" }}
              marginBottom={"10px"}
            >
              <Stack width={"50%"}>
                <Text>City</Text>
                <Select
                  placeholder="Select City"
                  variant={"filled"}
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
                  variant={"filled"}
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
            <HStack
              width={"100%"}
              marginLeft={{ base: "10px", md: "0px", lg: "0px" }}
              marginBottom={"10px"}
            >
              <Stack width={"50%"}>
                <Text>Category</Text>
                <Select
                  placeholder="Select Category"
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  width={"90%"}
                  onChange={(event) =>
                    handleInputChange(event, setSelectedCategory)
                  }
                  isRequired
                >
                  <option value="Restaurant">Restaurant</option>
                  <option value="Information Technology (IT)">
                    Information Technology (IT)
                  </option>
                  <option value="Retail Business">Retail Business</option>
                </Select>
              </Stack>
              <Stack width={"50%"}>
  <Text>Supporting Documents</Text>
  <Tooltip label="Please upload a PDF file combing all business related supporting documents for making you approval case strong" aria-label="A tooltip">
    <Input
      size="md"
      type="file"
      width={"90%"}
      accept=".pdf"
      onChange={handleFileChange}
    />
  </Tooltip>
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
        </Stack>
      </>)}

    </>
  );
};

export default Investeeregistration;
