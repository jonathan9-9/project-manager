import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useOutletContext } from "react-router";
import { Context } from "../App";

export const isInvalidEmail = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (email.match(emailPattern) && email.length > 0) {
    return false;
  } else {
    return true;
  }
};

const SignUp = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [secondPasswordInput, setSecondPasswordInput] = useState("");

  const toast = useToast();
  const context = useOutletContext() as Context;

  const [clickedSubmitName, setClickedSubmitName] = useState(false);
  const [clickedSubmitEmail, setClickedSubmitEmail] = useState(false);
  const [clickedSubmitUsername, setClickedSubmitUsername] = useState(false);
  const [clickedSubmitPhoto, setClickedSubmitPhoto] = useState(false);
  const [clickedSubmitPassword, setClickedSubmitPassword] = useState(false);
  const [clickedSubmitSecondPassword, setClickedSubmitSecondPassword] =
    useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const isInvalidPass2 = (password1: string, password2: string) => {
    if (password1 !== password2) {
      return true;
    } else {
      return false;
    }
  };

  const isErrorName = nameInput === "" && (clickedSubmitName || formSubmitted);
  const isErrorEmail =
    (isInvalidEmail(emailInput) || emailInput === "") &&
    (clickedSubmitEmail || formSubmitted);
  const isErrorUsername =
    usernameInput === "" && (clickedSubmitUsername || formSubmitted);
  const isErrorPhoto =
    photoInput === "" && (clickedSubmitPhoto || formSubmitted);
  const isErrorPassword =
    passwordInput === "" && (clickedSubmitPassword || formSubmitted);
  const isErrorSecondPassword =
    isInvalidPass2(passwordInput, secondPasswordInput) &&
    clickedSubmitSecondPassword;

  const resetForm = () => {
    setClickedSubmitName(false);
    setClickedSubmitEmail(false);
    setClickedSubmitUsername(false);
    setClickedSubmitPhoto(false);
    setClickedSubmitPassword(false);
    setClickedSubmitSecondPassword(false);

    setNameInput("");
    setEmailInput("");
    setUsernameInput("");
    setPhotoInput("");
    setPasswordInput("");
    setSecondPasswordInput("");

    setFormSubmitted(false);
  };

  const [passwordErrorMessage, setPasswordErrorMessage] = useState<
    string | null
  >("");

  const handleNameInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitName(true);
    setNameInput((e.target as HTMLInputElement).value);
  };
  const handleEmailInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitEmail(true);
    setEmailInput((e.target as HTMLInputElement).value);
  };
  const handleUsernameInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitUsername(true);
    setUsernameInput((e.target as HTMLInputElement).value);
  };
  const handlePhotoInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitPhoto(true);
    setPhotoInput((e.target as HTMLInputElement).value);
  };
  const handlePasswordInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClickedSubmitPassword(true);
    const currentPassword = (e.target as HTMLInputElement).value;

    setPasswordInput(currentPassword);

    setPasswordErrorMessage(passwordCheck(currentPassword));
  };
  const handleSecondPasswordInputChange = (
    e: React.FormEvent<HTMLInputElement>
  ) => {
    setClickedSubmitSecondPassword(true);
    const currentPassword = (e.target as HTMLInputElement).value;

    setSecondPasswordInput(currentPassword);

    setPasswordErrorMessage(passwordCheck(currentPassword));
  };

  const passwordCheck = (password: string): string | null => {
    if (password.length >= 7 && password.length <= 18) {
      return null;
    } else {
      return "Password must be valid within 7 and 18 characters long.";
    }
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked");

    if (nameInput === "") {
      setClickedSubmitName(true);
    }
    if (emailInput === "" || isInvalidEmail(emailInput)) {
      setClickedSubmitEmail(true);
    }
    if (usernameInput === "") {
      setClickedSubmitUsername(true);
    }
    if (photoInput === "") {
      setClickedSubmitPhoto(true);
    }
    if (passwordInput === "") {
      setClickedSubmitPassword(true);
    }
    if (passwordInput !== secondPasswordInput || secondPasswordInput === "") {
      setClickedSubmitSecondPassword(true);
    } else {
      const passwordError = passwordCheck(passwordInput);

      if (passwordError) {
        console.error("Password error:", passwordError);

        toast({
          title: "Invalid Password",
          description: passwordError,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const data = {
          name: nameInput,
          email: emailInput,
          username: usernameInput,
          photo: photoInput,
          password: passwordInput,
        };

        try {
          const response = await fetch(
            "http://localhost:3000/api/auth/signup",
            {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(data),
            }
          );

          console.log("sign up response", response);

          if (response.ok) {
            toast({
              title: "Account created",
              description: "Successfully created user account",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            resetForm();
            context.toggleAuthenticated();
            return response.json();
          } else {
            console.error("server error", response.status, response.statusText);
          }
        } catch (error) {
          console.error("fetch error", error);

          toast({
            title: "An error occurred",
            description: "Unable to create a user account",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    }
  };

  return (
    <>
      <Center>
        <Text as="b" fontSize="22px" mb="8" mt="2">
          Create an Account
        </Text>
      </Center>
      <Center>
        <Box w="40%" mb={12} p="8" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
          <FormControl isInvalid={isErrorName} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={nameInput}
              onChange={handleNameInputChange}
            />
            {!isErrorName ? null : (
              <FormErrorMessage>Name is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorEmail} isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={emailInput}
              onChange={handleEmailInputChange}
            />
            {!isErrorEmail ? (
              <FormHelperText>Enter email</FormHelperText>
            ) : (
              <FormErrorMessage>Must enter a valid email</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorUsername} isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={usernameInput}
              onChange={handleUsernameInputChange}
            />
            {!isErrorUsername ? (
              <FormHelperText>Enter username.</FormHelperText>
            ) : (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorPhoto} isRequired>
            <FormLabel>Profile Photo</FormLabel>
            <Input
              type="text"
              value={photoInput}
              onChange={handlePhotoInputChange}
            />
            {!isErrorPhoto ? (
              <FormHelperText>Add your profile photo.</FormHelperText>
            ) : (
              <FormErrorMessage>Profile photo is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorPassword} isRequired mb={7}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={passwordInput}
              onChange={handlePasswordInputChange}
            />
            {!isErrorPassword ? (
              <FormHelperText>
                Password must be within 7 and 18 characters long.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Password is required.</FormErrorMessage>
            )}
            <FormErrorMessage>
              {passwordCheck(passwordInput) !== null
                ? passwordErrorMessage
                : null}
            </FormErrorMessage>
          </FormControl>
          {/* second password entry  below*/}
          <FormControl isInvalid={isErrorSecondPassword} isRequired mb={7}>
            <FormLabel>Re-enter password</FormLabel>
            <Input
              type="password"
              value={secondPasswordInput}
              onChange={handleSecondPasswordInputChange}
            />
            {!isErrorSecondPassword ? (
              <FormHelperText>
                Password must be within 7 and 18 characters long.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Passwords must match.</FormErrorMessage>
            )}
            <FormErrorMessage>
              {passwordCheck(passwordInput) !== null
                ? passwordErrorMessage
                : null}
            </FormErrorMessage>
          </FormControl>
          <Button
            style={{ backgroundColor: "#0077B5", color: "#FFFFFF" }}
            size="md"
            height="42px"
            width="150px"
            p={3}
            type="submit"
            onClick={handleSignUpSubmit}
          >
            Create account
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default SignUp;
