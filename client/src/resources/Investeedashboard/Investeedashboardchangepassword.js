import React, { useEffect, useState } from "react";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Investeedashboardchangepassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleInputChange = (event, setState) => {
    setState(event.target.value);
  };
  const [showOldPassword, setShowOldPassword] = React.useState(false);
  const handleOldPasswordClick = () => setShowOldPassword(!showOldPassword);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handleNewPasswordClick = () => setShowNewPassword(!showNewPassword);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    React.useState(false);
  const handleConfirmNewPasswordClick = () =>
    setShowConfirmNewPassword(!showConfirmNewPassword);

  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      document.title = "Investify | Investee Passsword Change";
    } else {
      navigate("/user-login");
    }
  }, []);
  const changePassword = () => {
    const token = window.localStorage.getItem("token");

    if (
      oldPassword &&
      newPassword &&
      confirmNewPassword
    ) {
      if (newPassword === confirmNewPassword) {
        fetch(`${process.env.REACT_APP_FETCH_URL_}/api/investee/change-password`, {
          method: "POST",
          body: JSON.stringify({
            oldPassword,
            newPassword,
            confirmNewPassword,
          }),
          headers: {
            token: token,
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
                title: "Password Updated",
                description: "Success",
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
            }
          })
          .catch((err) => console.log(err));
      } else {
        toast({
          title: "New Passwords doesnot match",
          description: "Make sure that both New Passwords field match",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "top",
        });
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
    }
  };
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
          <Stack
            width={{ base: "100%", md: "50%", lg: "50%" }}
            spacing={"0px"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <HStack width={"100%"} marginBottom={5}>
              <Stack width={"100%"}>
                <Text>Old Password</Text>
                <InputGroup width={"90%"}>
                  <Input
                    pr="4.5rem"
                    type={showOldPassword ? "text" : "password"}
                    placeholder="Enter password"
                    variant={"filled"}
                    border={"0.5px solid grey"}
                    isRequired
                    onChange={(event) =>
                      handleInputChange(event, setOldPassword)
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleOldPasswordClick}
                    >
                      {showOldPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </HStack>
            <HStack width={"100%"} marginBottom={5}>
              <Stack width={"100%"}>
                <Text>New Password</Text>
                <InputGroup width={"90%"}>
                  <Input
                    pr="4.5rem"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter password"
                    variant={"filled"}
                    border={"0.5px solid grey"}
                    isRequired
                    onChange={(event) =>
                      handleInputChange(event, setNewPassword)
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleNewPasswordClick}
                    >
                      {showNewPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </HStack>
            <HStack width={"100%"} marginBottom={5}>
              <Stack width={"100%"}>
                <Text>Confirm New Password</Text>
                <InputGroup width={"90%"}>
                  <Input
                    pr="4.5rem"
                    type={showConfirmNewPassword ? "text" : "password"}
                    placeholder="Enter password"
                    variant={"filled"}
                    border={"0.5px solid grey"}
                    isRequired
                    onChange={(event) =>
                      handleInputChange(event, setConfirmNewPassword)
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={handleConfirmNewPasswordClick}
                    >
                      {showConfirmNewPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Stack>
            </HStack>
            <Button
              colorScheme="teal"
              variant="solid"
              marginTop={"30px"}
              size={{ base: "md", md: "md", lg: "lg" }}
              onClick={changePassword}
            >
              Update Password
            </Button>
          </Stack>
        </HStack>
      </Sidebar>
    </>
  );
};

export default Investeedashboardchangepassword;
