import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const ResetPassword = () => {
  const { id, token } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

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
    } else if (secondPassword === "") {
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
          navigate("/login");
          toast({
            title: "Success",
            description: "Your password has been successfully reset!",
            status: "success",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
          const responseData = await response.json();
          return responseData;
        }
      } catch (error) {
        toast({
          title: "Password reset failed",
          description: "We cannot reset your password at this moment.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
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
