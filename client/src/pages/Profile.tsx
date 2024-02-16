import { Box, Button, Center, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router";

interface UserProfileData {
  name: string;
  email: string;
  username: string;
  photo: string;
}

const Profile = () => {
  const data = useLoaderData() as UserProfileData;

  console.log("Loader DATA", data);
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
          <Button color="red">Log out</Button>
        </Box>
      </Center>
    </>
  );
};

export default Profile;
