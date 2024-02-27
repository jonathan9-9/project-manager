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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";
import ForgotPasswordComp from "../components/Login/ForgotPasswordComp";

const Login = () => {
  const navigate = useNavigate();
  const context = useOutletContext() as Context;
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            description: `Welcome back ${usernameInput}!`,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
          const responseData = await response.json();

          console.log("RESPONSE Login DATA", responseData);

          // retrieve access token after successful response
          const receivedToken = responseData.access_token;

          console.log("receivedToken:", receivedToken);

          // set token to local storage
          localStorage.setItem("token", receivedToken);

          // toggle login state
          context.toggleAuthenticated();
          // pass received token to authContext provider via hook to authorize any future requests to the server
          authContext.setToken(receivedToken);

          navigate("/projects");
        } else {
          console.error("error fetching token");
          toast({
            title: "Unable to log in",
            description: "Incorrect username or password",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top",
          });
        }
      } catch (error) {
        console.error("failed to fetch data", error);
        toast({
          title: "An error occurred",
          description: "Unable to log in",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      }
    }
  };

  return (
    <>
      <Center>
        <Text as="b" fontSize="22px" mb="4" mt="2" className="text-gray-200">
          Sign in
        </Text>
      </Center>
      <Center>
        <Box
          w="40%"
          p="8"
          className="bg-[#193073]"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        >
          <FormControl isInvalid={isErrorUsername} isRequired>
            <FormLabel className="text-gray-200">Username</FormLabel>
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
            <FormLabel className="text-gray-200">Password</FormLabel>
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

          <Box mt={4}>
            {/* #3498db */}
            <Button
              style={{ backgroundColor: "#9147ff", color: "#FFFFFF" }}
              size="md"
              height="42px"
              width="100%"
              p={4}
              type="submit"
              onClick={handleLoginSubmit}
            >
              Login
            </Button>
            <Box display="flex" mt={2}>
              <Text
                _hover={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={onOpen}
                className="text-gray-200"
              >
                Forgot account?
              </Text>
            </Box>
          </Box>
          <ForgotPasswordComp isOpen={isOpen} onClose={onClose} />
        </Box>
      </Center>
    </>
  );
};

export default Login;
