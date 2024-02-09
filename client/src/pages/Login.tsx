import React, { useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [clickedSubmitUsername, setClickedSubmitUsername] =
    useState<boolean>(false);
  const [clickedSubmitPassword, setClickedSubmitPassword] =
    useState<boolean>(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const authContext = useAuth();

  const toast = useToast();

  const isErrorUsername =
    usernameInput === "" && (clickedSubmitUsername || formSubmitted);

  const isErrorPassword =
    passwordInput === "" && (clickedSubmitPassword || formSubmitted);

  const onUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitUsername(true);
    setUsernameInput((e.target as HTMLInputElement).value);
  };
  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitPassword(true);
    const currentPassword = (e.target as HTMLInputElement).value;

    setPasswordInput(currentPassword);
  };

  const resetForm = () => {
    setClickedSubmitUsername(false);
    setClickedSubmitPassword(false);

    setUsernameInput("");
    setPasswordInput("");

    setFormSubmitted(false);
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username: usernameInput,
      password: passwordInput,
    };

    if (passwordInput === "") {
      setClickedSubmitPassword(true);
    }

    if (usernameInput === "") {
      setClickedSubmitUsername(true);
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        });

        if (response.ok) {
          resetForm();
          toast({
            title: "Log in",
            description: "Successfully logged in!",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          const responseData = await response.json();

          console.log("RESPONSE DATA", responseData);

          // retrieve access token after successful response
          const receivedToken = responseData.access_token;

          console.log("receivedToken:", receivedToken);

          // set token to local storage
          localStorage.setItem("token", receivedToken);

          // pass received token to authContext provider via hook to authorize any future requests to the server
          authContext.setToken(receivedToken);
        } else {
          console.error("error fetching token");
        }
      } catch (error) {
        console.error("failed to fetch data", error);
        toast({
          title: "An error occurred",
          description: "Unable to log in",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <>
      <Center>
        <Text as="b" fontSize="22px" mb="4">
          Log In
        </Text>
      </Center>
      <Box w="42%" p="4" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
        <FormControl isInvalid={isErrorUsername} isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            id="name"
            type="text"
            value={usernameInput}
            onChange={onUsernameChange}
          />
          {!isErrorUsername ? null : (
            <FormErrorMessage>Name is required.</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isInvalid={isErrorPassword} isRequired>
          <FormLabel>Password</FormLabel>
          <Input
            id="password"
            type="password"
            value={passwordInput}
            onChange={onPasswordChange}
          />
          {!isErrorPassword ? null : (
            <FormErrorMessage>Password is required.</FormErrorMessage>
          )}
        </FormControl>
        <Button
          style={{ backgroundColor: "#3498db", color: "#FFFFFF" }}
          size="md"
          height="42px"
          width="150px"
          p={3}
          type="submit"
          onClick={handleLoginSubmit}
        >
          Login
        </Button>
      </Box>
    </>
  );
};

export default Login;
