import { Box, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { UserProfileData } from "./Profile";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectAccordion from "../components/Projects/ProjectAccordion";
import { useState } from "react";

export interface Project {
  name: string;
  description: string;
  status: string;
}

interface LoaderDataType {
  user: UserProfileData;
  projects: Project[];
}

const Projects = () => {
  const data = useLoaderData() as LoaderDataType;

  const user = data.user as UserProfileData;
  console.log("Loader Data", data);

  const [projects, setProjects] = useState(data.projects);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <Box>
      <Text mt={2} align="center">
        {user.name}'s Projects
      </Text>
      <Slider {...sliderSettings}>
        {projects.map((project, index) => (
          <Box
            key={index}
            alignContent="center"
            p={7}
            m={2}
            bg="gray.100"
            border="1px solid black"
          >
            <Text mb={4} as="b">
              {project.name}
            </Text>
            <Text noOfLines={1}>{project.description}</Text>
            <Box>
              {project.status === "In Progress" ? (
                <Text color="orange">{project.status}</Text>
              ) : project.status === "Done" ? (
                <Text color="green">{project.status}</Text>
              ) : project.status === "Testing" ? (
                <Text color="purple">{project.status}</Text>
              ) : project.status === "To Do" ? (
                <Text color="red">{project.status}</Text>
              ) : null}
            </Box>
          </Box>
        ))}
      </Slider>
      <Box mt={14}>
        <ProjectAccordion projects={projects} setProjects={setProjects} />
      </Box>
    </Box>
  );
};

export default Projects;
