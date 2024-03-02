import {
  Box,
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
import { useNavigate, useOutletContext } from "react-router";
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
  const navigate = useNavigate();

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
            navigate("/login");
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
        <Box
          mb={7}
          mt={12}
          justifyContent="center"
          textAlign="center"
          fontFamily="Open Sans, sans-serif"
        >
          <Text as="b" fontSize="22px" mb="4" className="text-gray-200">
            Create your account
          </Text>
          <Text className="text-gray-200">
            Create an account to view and manage your projects
          </Text>
        </Box>
      </Center>

      <Center>
        <Box
          w="40%"
          mb={12}
          p="8"
          className="#212428"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
        >
          <FormControl isInvalid={isErrorName} isRequired>
            <FormLabel className="text-gray-200">Name</FormLabel>
            <Input
              className="text-gray-200"
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
            <FormLabel mt={2} className="text-gray-200">
              Email
            </FormLabel>
            <Input
              className="text-gray-200"
              type="email"
              value={emailInput}
              onChange={handleEmailInputChange}
            />
            {!isErrorEmail ? null : (
              <FormErrorMessage className="text-white">
                Must enter a valid email
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorUsername} isRequired>
            <FormLabel mt={3} className="text-gray-200">
              Username
            </FormLabel>
            <Input
              className="text-gray-200"
              type="text"
              value={usernameInput}
              onChange={handleUsernameInputChange}
            />
            {!isErrorUsername ? null : (
              <FormErrorMessage>Username is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl isInvalid={isErrorPhoto} isRequired>
            <FormLabel mt={3} className="text-gray-200">
              Profile Photo
            </FormLabel>
            <Input
              className="text-gray-200"
              type="text"
              value={photoInput}
              onChange={handlePhotoInputChange}
            />
            {/* #87CEEB */}
            {!isErrorPhoto ? (
              <FormHelperText color="#c4cfde">
                Add your profile photo.
              </FormHelperText>
            ) : (
              <FormErrorMessage>Profile photo is required.</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={isErrorPassword} isRequired mb={7}>
            <FormLabel className="text-gray-200">Password</FormLabel>
            <Input
              className="text-gray-200"
              type="password"
              value={passwordInput}
              onChange={handlePasswordInputChange}
            />
            {!isErrorPassword ? (
              <FormHelperText color="#c4cfde">
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
            <FormLabel className="text-gray-200">Re-enter password</FormLabel>
            <Input
              className="text-gray-200"
              type="password"
              value={secondPasswordInput}
              onChange={handleSecondPasswordInputChange}
            />
            {!isErrorSecondPassword ? (
              <FormHelperText color="#c4cfde">
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
          <Box>
            <button
              className="text-white bg-[#ff014f] p-2  shadow-xl rounded-xl w-full mb-4"
              type="submit"
              onClick={handleSignUpSubmit}
            >
              Create your account
            </button>
            <hr />
            <Box>
              <Text mt={4} align="center">
                <span className="text-gray-200">
                  {" "}
                  By creating an account you agree to our{" "}
                </span>{" "}
                <span className="purple-text">
                  Terms of <br />
                  Service
                </span>{" "}
                <span className="text-gray-200"> and </span>{" "}
                <span className="purple-text">Privacy Policy.</span>
              </Text>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default SignUp;
