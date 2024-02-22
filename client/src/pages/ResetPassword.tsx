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
    setSecondPassword((e.target as HTMLInputElement).value);
  };

  const resetForm = () => {
    setSubmitPassword(false);
    setSubmitSecondPassword(false);

    setPassword("");
    setSecondPassword("");

    setFormSubmitted(false);
  };

  const onSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password === "") {
      setSubmitPassword(true);
    }
    if (secondPassword === "") {
      setSubmitSecondPassword(true);
    } else {
      try {
        const data = {
          newPassword: password,
          id: id,
          token: token,
        };
        const response = await fetch(
          "http://localhost:3000/api/auth/save-new-password",
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(data),
          }
        );
        if (response.ok) {
          resetForm();
          console.log("response", response);

          const responseData = await response.json();
          return responseData;
        } else {
          // toast message here
          console.error("error saving new password");
        }
      } catch (error) {
        // toast message here
        console.log("error saving new password", error);
      }
    }

    console.log("password", password);
    console.log("second password", secondPassword);
  };

  return (
    <>
      <Box as="b" ml={8} mt={4}>
        <Text>Reset Your Password</Text>
      </Box>
      <Box
        w="45%"
        p="7"
        mt={10}
        ml={5}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.2)"
      >
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
        <Button
          style={{ backgroundColor: "#006D5B", color: "#FFFFFF" }}
          mt={4}
          width="100%"
          onClick={onSubmitPassword}
          type="button"
        >
          Reset Password
        </Button>
      </Box>
    </>
  );
};

export default ResetPassword;
