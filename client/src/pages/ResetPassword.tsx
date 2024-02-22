import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [submitPassword, setSubmitPassword] = useState(false);
  const [submitSecondPassword, setSubmitSecondPassword] = useState(false);

  const isErrorPassword = password === "" && (submitPassword || formSubmitted);
  const isErrorSecondPassword =
    (secondPassword === "" && (submitSecondPassword || formSubmitted)) ||
    password !== secondPassword;

  const onChangePassword = (e: React.FormEvent) => {
    setSubmitPassword(true);
    setPassword((e.target as HTMLInputElement).value);
  };
  const onChangeSecondPassword = (e: any) => {
    setSubmitSecondPassword(true);
    setSecondPassword(e.target.value);
  };

  const resetForm = () => {
    setSubmitPassword(false);
    setSubmitSecondPassword(false);

    setPassword("");
    setSecondPassword("");

    setFormSubmitted(false);
  };

  const onSubmitPassword = (e: any) => {
    e.preventDefault();

    if (password === "") {
      setSubmitPassword(true);
    }
    if (secondPassword === "") {
      setSubmitSecondPassword(true);
    } else {
      resetForm();
    }

    console.log("password", password);
    console.log("second password", secondPassword);
  };

  return (
    <Box w="40%" mb={12} p="8" boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)">
      <Text>Reset Your Password</Text>
      <FormControl isInvalid={isErrorPassword} isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={onChangePassword}
        />
        {!isErrorPassword ? null : (
          <FormErrorMessage>Password is required.</FormErrorMessage>
        )}
      </FormControl>
      <FormControl isInvalid={isErrorSecondPassword} isRequired>
        <FormLabel>Re-enter password</FormLabel>
        <Input
          id="secondPassword"
          type="password"
          value={secondPassword}
          onChange={onChangeSecondPassword}
        />
        {!isErrorSecondPassword ? null : (
          <FormErrorMessage>Password must match</FormErrorMessage>
        )}
      </FormControl>
      <Button width="100%" onClick={onSubmitPassword} type="button">
        Submit
      </Button>
    </Box>
  );
};

export default ResetPassword;
