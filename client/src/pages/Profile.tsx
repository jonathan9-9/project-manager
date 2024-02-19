import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";

interface UserProfileData {
  name: string;
  email: string;
  username: string;
  photo: string;
}

const Profile = () => {
  const data = useLoaderData() as UserProfileData;
  const navigate = useNavigate();
  const toast = useToast();
  const context = useOutletContext() as Context;
  console.log("Loader DATA", data);

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
  const { name, email, username, photo } = data;

  return (
    <Center>
      <Box p={8} maxW="xl">
        <Text textAlign="center" mb={4} fontSize={20}>
          Account Details
        </Text>
        <Text textAlign="center" mb={8}>
          Welcome, {name}! You can manage your account details here.
        </Text>
        <Flex align="center" justify="center">
          <Box mr={8}>
            <Avatar size="2xl" name={name} bg="purple.500" mb={4}>
              <AvatarBadge bg="green.500" boxSize="1em" />
            </Avatar>
          </Box>
          <Box>
            <Box mb={4}>
              <Flex mb={2}>
                <Text>Name:</Text>
                <Text ml={20}>{name}</Text>
              </Flex>
              <Flex mb={2}>
                <Text>Email:</Text>
                <Text ml={20}>{email}</Text>
              </Flex>
              <Flex mb={2}>
                <Text>Username:</Text>
                <Text ml={20}>{username}</Text>
              </Flex>
              <Flex mb={2}>
                <Text>Password:</Text>
                <Text ml={20}>***********</Text>
              </Flex>
            </Box>
            <Button colorScheme="red" onClick={logOut}>
              Log out
            </Button>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
};

export default Profile;
