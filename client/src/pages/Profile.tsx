import { Box, Button, Center, Text, useToast } from "@chakra-ui/react";
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
    <>
      <Center>
        <Box>
          <Text mb={4} fontSize={20}>
            Account Details
          </Text>
          <Box>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Username: {username}</p>
            <p>Photo: {photo}</p>
          </Box>
          <Button color="red" onClick={logOut}>
            Log out
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default Profile;
