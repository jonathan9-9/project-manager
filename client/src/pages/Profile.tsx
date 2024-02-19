import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router";
import { Context } from "../App";

import UserDetails from "../components/Profile/UserDetails";

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
  const { name, email, username } = data;

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20}>
        Account Details
      </Text>
      <Text textAlign="center" mb={8}>
        Welcome, {name}! You can manage your account details here.
      </Text>

      <Box display="flex" w="60%" gap={10} m="0 auto" py={10}>
        <Box display="flex" alignItems="center">
          <Avatar size="2xl" name={name} bg="blue.400" mb={4}>
            <AvatarBadge bg="green.500" boxSize="1em" />
          </Avatar>
        </Box>
        <Box w="100%" display="flex" flexDirection="column" gap={6}>
          <UserDetails value={name} field="Name:" />

          <UserDetails value={email} field="Email:" />

          <UserDetails value={username} field="Username:" />

          <UserDetails value="***********" field="Password:" />

          <Box display="flex" gap={4} justifyContent="center">
            <Button color="gray.800" onClick={() => logOut()}>
              Log out
            </Button>
            <Button colorScheme="red" onClick={() => {}}>
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
