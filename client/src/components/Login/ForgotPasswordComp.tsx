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
} from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordComp = ({ isOpen, onClose }: Props) => {
  const [email, setEmail] = useState("");

  const onChangeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const onSubmitEmail = () => {
    console.log("EMAIL", email);
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
