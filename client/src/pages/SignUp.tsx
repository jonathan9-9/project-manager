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
} from "@chakra-ui/react";
import { useState } from "react";

const SignUp = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const [clickedSubmitName, setClickedSubmitName] = useState(false);
  const [clickedSubmitEmail, setClickedSubmitEmail] = useState(false);
  const [clickedSubmitUsername, setClickedSubmitUsername] = useState(false);
  const [clickedSubmitPhoto, setClickedSubmitPhoto] = useState(false);
  const [clickedSubmitPassword, setClickedSubmitPassword] = useState(false);

  const isErrorName = nameInput === "" && clickedSubmitName;
  const isErrorEmail = emailInput === "" && clickedSubmitEmail;
  const isErrorUsername = usernameInput === "" && clickedSubmitUsername;
  const isErrorPhoto = photoInput === "" && clickedSubmitPhoto;
  const isErrorPassword = passwordInput === "" && clickedSubmitPassword;

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
    setPasswordInput((e.target as HTMLInputElement).value);
  };

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit button clicked");

    setClickedSubmitName(true);
    setClickedSubmitEmail(true);
    setClickedSubmitUsername(true);
    setClickedSubmitPhoto(true);
    setClickedSubmitPassword(true);

    if (
      nameInput === "" ||
      emailInput === "" ||
      usernameInput === "" ||
      photoInput === "" ||
      passwordInput === ""
    ) {
      console.log("All fields are required");
    } else {
      console.log("form submit successfully");

      const data = {
        nameInput: nameInput,
        emailInput: emailInput,
        usernameInput: usernameInput,
        photoInput: photoInput,
        passwordInput: passwordInput,
      };

      const response = await fetch("http://localhost:3000/api/auth/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      });

      console.log("response", response);

      setNameInput("");
      setEmailInput("");
      setUsernameInput("");
      setPhotoInput("");
      setPasswordInput("");

      setClickedSubmitName(false);
      setClickedSubmitEmail(false);
      setClickedSubmitUsername(false);
      setClickedSubmitPhoto(false);
      setClickedSubmitPassword(false);

      return response.json();
    }
  };

  return (
    <>
      <Center>
        <Text as="b" fontSize="22px" mb="4">
          Create an Account
        </Text>
      </Center>
      <Center>
        <Box w="42%" p="4" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
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
              <FormHelperText>Enter valid email.</FormHelperText>
            ) : (
              <FormErrorMessage>Email is required.</FormErrorMessage>
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
            <FormLabel>Photo</FormLabel>
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
              <FormHelperText>Enter your password</FormHelperText>
            ) : (
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
