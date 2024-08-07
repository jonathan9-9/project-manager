import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";
import UserDetailsRow from "../components/Profile/UserDetailsRow";
import { useState } from "react";

export interface UserProfileData {
  name: string;
  email: string;
  username: string;
  photo: string;
}

const Profile = () => {
  const loaderData = useLoaderData() as UserProfileData;
  const [data, setData] = useState(loaderData);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;

  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);

  const deleteProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:3000/api/auth/delete-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        console.log("RESPONSE", response);
        navigate("/sign-up");
        toast({
          title: "Success",
          description: "Your account has been deleted!",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.log("error", error);
      toast({
        title: "Error",
        description: "Unable to delete account",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } finally {
      closeDeleteModal(); // Close the modal regardless of success or failure
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    context.toggleAuthenticated();
    navigate("/login");
    toast({
      title: "Success",
      description: "You have been logged out of your account!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  };

  const { name, email, username } = data;

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20} className="text-gray-200">
        Account Details
      </Text>
      <Text textAlign="center" mb={8} className="text-gray-200">
        Welcome, {name}! You can manage your account details here.
      </Text>

      <Box display="flex" w="60%" gap={10} m="0 auto" py={10}>
        <Box display="flex" alignItems="center">
          <Avatar size="2xl" name={name} bg="pink.400" mb={4}>
            <AvatarBadge bg="green.500" boxSize="1em" />
          </Avatar>
        </Box>
        <Box w="100%" display="flex" flexDirection="column" gap={6}>
          <UserDetailsRow
            value={name}
            field="Name"
            username={username}
            setData={setData}
          />

          <UserDetailsRow
            value={email}
            field="Email"
            username={username}
            setData={setData}
          />

          <UserDetailsRow
            value={username}
            field="Username"
            username={username}
            setData={setData}
          />

          <UserDetailsRow
            value="***********"
            field="Password"
            username={username}
            setData={setData}
          />

          <Box display="flex" gap={4} justifyContent="center">
            <button
              className="bg-gray-200 rounded-lg p-2"
              onClick={() => logOut()}
            >
              Log out
            </button>
            <button
              className="bg-[#ff014f] rounded-lg p-2"
              onClick={openDeleteModal}
            >
              Delete Account
            </button>
          </Box>
        </Box>
      </Box>
      {/* modal: extra step to deleting account */}
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to permanently delete your account?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={() => deleteProfile()}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
