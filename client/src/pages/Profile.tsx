import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";
import { FaUserEdit } from "react-icons/fa";

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
      <Text textAlign="center" mb={4} fontSize={20}>
        Account Details
      </Text>
      <Text textAlign="center" mb={8}>
        Welcome, {name}! You can manage your account details here.
      </Text>
      <Box display="flex" w="60%" gap={10} m="0 auto" py={20}>
        <Box mr={8}>
          <Avatar size="2xl" name={name} bg="blue.400" mb={4}>
            <AvatarBadge bg="green.500" boxSize="1em" />
          </Avatar>
        </Box>
        <Box px={8}>
          <Box mb={2}>
            <Flex mb={4} align="center">
              <Text w="80%">Name:</Text>
              <Text>{name}</Text>
              <Box ml={8}>
                <FaUserEdit cursor="pointer" onClick={() => {}} />
              </Box>
            </Flex>
            <Flex mb={4} align="center">
              <Text w="80%">Email:</Text>
              <Text>{email}</Text>
              <Box ml={5}>
                <FaUserEdit cursor="pointer" onClick={() => {}} />
              </Box>
            </Flex>
            <Flex mb={4} align="center">
              <Text flex={1}>Username:</Text>
              <Text>{username}</Text>
              <Box ml={6}>
                <FaUserEdit
                  cursor="pointer"
                  onClick={() => console.log("Hello")}
                />
              </Box>
            </Flex>
            <Box display="flex">
              <Flex mb={4} align="center">
                <Text flex={1}>Password:</Text>
                <Text ml={20}>***********</Text>
                <Box ml={6}>
                  <FaUserEdit cursor="pointer" onClick={() => {}} />
                </Box>
              </Flex>
            </Box>
          </Box>
          <Box display="flex" gap={4}>
            <Button color="gray.900" onClick={() => {}}>
              Log out
            </Button>
            <Button colorScheme="red" onClick={() => {}}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Center>
  );
};

export default Profile;
