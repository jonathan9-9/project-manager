import { Box } from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { UserProfileData } from "./Profile";

const Projects = () => {
  const data = useLoaderData() as UserProfileData;
  console.log("data", data);

  // const projects_list = [];
  return <Box>Projects Page</Box>;
};

export default Projects;
