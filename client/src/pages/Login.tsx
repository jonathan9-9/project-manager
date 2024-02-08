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
} from "@chakra-ui/react";

const Login = () => {
  const [usernameInput, setUsernameInput] = useState<string>("");
  const [passwordInput, setPasswordInput] = useState<string>("");

  const [clickedSubmitUsername, setClickedSubmitUsername] =
    useState<boolean>(false);
  const [clickedSubmitPassword, setClickedSubmitPassword] =
    useState<boolean>(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >("");

  const authContext = useAuth();

  const isErrorUsername = usernameInput === "" && clickedSubmitUsername;

  const isErrorPassword = passwordInput === "" && clickedSubmitPassword;

  const onUsernameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitUsername(true);
    setUsernameInput((e.target as HTMLInputElement).value);
  };
  const onPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitPassword(true);
    const currentPassword = (e.target as HTMLInputElement).value;

    setPasswordInput(currentPassword);

    setPasswordErrorMessage(passwordCheck(currentPassword));
  };

  const passwordCheck = (password: string): string | null => {
    if (password.length >= 7 && password.length <= 18) {
      return null;
    } else {
      return "Password must be valid within 7 and 18 characters long.";
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      usernameInput: usernameInput,
      passwordInput: passwordInput,
    };

    try {
      if (usernameInput === "" || passwordInput === "") {
        return "All fields are required";
      }

      const response = await fetch("http://localhost:3000/api/auth/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      const passwordError = passwordCheck(passwordInput);

      if (!passwordError && response.ok) {
        const responseData = await response.json();

        console.log("RESPONSE DATA", responseData);

        const receivedToken = responseData.access_token;

        localStorage.setItem("token", receivedToken);

        setUsernameInput("");
        setPasswordInput("");

        setClickedSubmitUsername(true);
        setClickedSubmitPassword(true);

        authContext.setToken(receivedToken);
      } else {
        console.error("error fetching token");
      }
    } catch (error) {
      console.error("failed to fetch data", error);
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

          <FormErrorMessage>
            {passwordCheck(passwordInput) !== null
              ? passwordErrorMessage
              : null}
          </FormErrorMessage>
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
