import { Box, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { UserProfileData } from "./Profile";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectAccordion from "../components/Projects/ProjectAccordion";

interface Project {
  name: string;
  description: string;
  status: string;
}

const Projects = () => {
  const data = useLoaderData() as UserProfileData;
  console.log("data", data);
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <Box>
      <Text mt={2} align="center">
        {data.name}'s Projects
      </Text>
      <Slider {...sliderSettings}>
        {mock_projects_data.map((project, index) => (
          <Box
            key={index}
            alignContent="center"
            p={7}
            m={2}
            bg="gray.100"
            border="1px solid black"
          >
            <Text mb={2}>{project.name}</Text>
            <Text noOfLines={2}>{project.description}</Text>
            <Text mt={2} as="b">
              {project.status}
            </Text>
          </Box>
        ))}
      </Slider>
      <Box mt={12}>
        <ProjectAccordion />
      </Box>
    </Box>
  );
};

export default Projects;
