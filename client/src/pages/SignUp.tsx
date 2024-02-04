import {
  Box,
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
        <Box
          w="45%"
          alignItems="center"
          display="flex"
          flexDirection="column"
          p="4"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        >
          <FormControl isInvalid={isErrorName} isRequired>
            <FormLabel>Name</FormLabel>
            <Input
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
        </Box>
      </Center>
    </>
  );
};

export default SignUp;
