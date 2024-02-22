import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { isInvalidEmail } from "../../pages/SignUp";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordComp = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onSubmitEmail = async () => {
    console.log("EMAIL", email);

    if (isInvalidEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } else {
      axios
        .post("http://localhost:3000/api/auth/reset-password", {
          email,
        })
        .then((response) => {
          console.log("response", response);
          setEmail("");
          toast({
            title: "Success",
            description: "Check your email for further instructions.",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          console.log("ERROR", error);
          if (error.response.data.message === "email not found") {
            toast({
              title: "Success",
              description: "Check your email for further instructions.",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Error",
              description: error.response.data.message,
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Find your account</ModalHeader>
        <hr />
        <ModalCloseButton />
        <ModalBody>
          <Box mt={2}>Please enter your email to search for your account.</Box>
          <Box>
            <Input type="text" onChange={onChangeEmail} />
          </Box>
        </ModalBody>
        <Box mt={3}>
          <hr />
        </Box>
        <ModalFooter gap={2}>
          <Button onClick={onClose} color="ghost">
            Cancel
          </Button>
          <Button
            style={{ backgroundColor: "#9147ff", color: "#FFFFFF" }}
            mr={3}
            onClick={onSubmitEmail}
          >
            Search
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ForgotPasswordComp;
