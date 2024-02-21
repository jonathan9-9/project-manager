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
import { useState } from "react";

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
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/reset-password",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(email),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setEmail("");
      console.log("response", response);
      onClose();
      return data;
    } catch (error) {
      console.error("ERR", error);
      toast({
        title: "Error",
        description: String(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
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
            style={{ backgroundColor: "#1877f2", color: "#FFFFFF" }}
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
