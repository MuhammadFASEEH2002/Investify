import React from 'react'
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
  Link,
  Select
} from "@chakra-ui/react";

const Investeedashboardlistingcreation = () => {
  return (
    <>
      <Sidebar>
      <HStack
        width={"100%"}
        flexDirection={{ base: "column", md: "row", lg: "row" }}
        spacing={"0px"}
      >
        <Stack width={{ base: "100%", md: "50%", lg: "50%" }} spacing={"0px"}>
          <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
            <Stack width={"50%"}>
              <Text>Business Name</Text>
              <Input
                type="text"
                placeholder="e.g SZAB Tech"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
              
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
                // onChange={(event) => handleInputChange(event, setEmail)}
              />
            </Stack>
          </HStack>
          <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
            <Stack width={"50%"}>
              <Text>Phone Number</Text>
              <Input
                type="number"
                placeholder="e.g 03001123456"
                width={"90%"}
                variant={"filled"}
                border={"0.5px solid grey"}
                isRequired
                // onChange={(event) => handleInputChange(event, setPhoneNumber)}
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
                // onChange={(event) => handleInputChange(event, setCnic)}
              />
            </Stack>
          </HStack>
          <HStack marginLeft={{ base: "10px", md: "20px", lg: "20px" }}>
            <Stack width={"50%"}>
              <Text>Password</Text>
              <InputGroup width={"90%"}>
                <Input
                  pr="4.5rem"
                  // type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                  // onChange={(event) => handleInputChange(event, setPassword)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" 
                  // onClick={handlePasswordClick}
                  >
                    {/* {showPassword ? "Hide" : "Show"} */}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
            <Stack width={"50%"}>
              <Text>Confirm Password</Text>
              <InputGroup width={"90%"}>
                <Input
                  pr="4.5rem"
                  // type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password"
                  variant={"filled"}
                  border={"0.5px solid grey"}
                  isRequired
                  // onChange={(event) =>
                  //   handleInputChange(event, setConfirmPassword)
                  // }
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    // onClick={handleConfirmPasswordClick}
                  >
                    {/* {showConfirmPassword ? "Hide" : "Show"} */}
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
                // onChange={(event) => handleInputChange(event, setAddress)}
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
                // onChange={(event) => handleInputChange(event, setZipcode)}
              />
            </Stack>
          </HStack>
          <HStack
            width={"100%"}
            marginLeft={{ base: "10px", md: "0px", lg: "0px" }}
          >
            <Stack width={"50%"}>
              <Text>City</Text>
              <Select
                placeholder="Select City"
                variant={"filled"}
                border={"0.5px solid grey"}
                width={"90%"}
                isRequired
                // onChange={(event) => handleInputChange(event, setSelectedCity)}
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
                // onChange={(event) =>
                //   handleInputChange(event, setSelectedCountry)
                // }
                isRequired
              >
                <option value="Pakistan">Pakistan</option>
              </Select>
            </Stack>
          </HStack>
          <HStack
            width={"100%"}
            marginLeft={{ base: "10px", md: "0px", lg: "0px" }}
          >
            <Stack width={"50%"}>
              <Text>Category</Text>
              <Select
                placeholder="Select Category"
                variant={"filled"}
                border={"0.5px solid grey"}
                width={"90%"}
                // onChange={(event) =>
                //   handleInputChange(event, setSelectedCategory)
                // }
                isRequired
              >
                <option value="Restaurant">Restaurant</option>
                <option value="Informmation Technology (IT)">
                  Informmation Technology (IT)
                </option>
                <option value="Retail Business">Retail Business</option>
              </Select>
            </Stack>
            <Stack width={"50%"}>
              <Text>Category</Text>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="file"
                width={"90%"}
                accept=".pdf"
                // onChange={handleFileChange} 
              />
            </Stack>
          </HStack>
        </Stack>
      </HStack>
      </Sidebar>
    </>
  )
}

export default Investeedashboardlistingcreation
