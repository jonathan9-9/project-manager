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

  const isErrorName = nameInput === "";
  const isErrorEmail = emailInput === "";
  const isErrorUsername = usernameInput === "";
  const isErrorPhoto = photoInput === "";
  const isErrorPassword = passwordInput === "";

  const handleNameInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setNameInput((e.target as HTMLInputElement).value);
  const handleEmailInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setEmailInput((e.target as HTMLInputElement).value);
  const handleUsernameInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setUsernameInput((e.target as HTMLInputElement).value);
  const handlePhotoInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setPhotoInput((e.target as HTMLInputElement).value);
  const handlePasswordInputChange = (e: React.FormEvent<HTMLInputElement>) =>
    setPasswordInput((e.target as HTMLInputElement).value);

  return (
    <>
      <Center>
        <Text as="b" fontSize="22px" mb="4">
          Create an Account
        </Text>
      </Center>
      <Center>
        <Box w="42%" p="4" boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)">
          <form>
            <FormControl isInvalid={isErrorName} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                id="name"
                type="text"
                value={nameInput}
                onChange={handleNameInputChange}
              />
              {!isErrorName ? (
                <FormHelperText>Enter legal name.</FormHelperText>
              ) : (
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
              {!isErrorEmail ? (
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
            >
              Create account
            </Button>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default SignUp;
