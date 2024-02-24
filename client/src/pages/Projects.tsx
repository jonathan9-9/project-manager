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

const mock_projects_data: Project[] = [
  {
    name: "Project A",
    description:
      "This is project A. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "To Do",
  },
  {
    name: "Project B",
    description:
      "This is project B. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "In Progress",
  },
  {
    name: "Project C",
    description:
      "This is project C. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "In Progress",
  },
  {
    name: "Project D",
    description:
      "This is project C. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "Testing",
  },
  {
    name: "Project E",
    description:
      "This is project C. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    status: "Done",
  },
];

const Projects = () => {
  const data = useLoaderData() as UserProfileData;
  const [projects, setProjects] = useState(mock_projects_data);
  console.log("data", data);

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
        {data.name}'s Projects
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
