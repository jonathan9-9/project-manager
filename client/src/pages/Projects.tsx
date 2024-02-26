import { Box, Text } from "@chakra-ui/react";
import { useLoaderData } from "react-router";
import { UserProfileData } from "./Profile";

import { useState } from "react";
import CreateProjectModal from "../components/Projects/CreateProjectModal";

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

  return (
    <Box>
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-8">
          <div className="text-2xl ml-4 text-white mb-3">All projects</div>

          <CreateProjectModal projects={projects} setProjects={setProjects} />
        </div>
        <div className="text-center flex-grow mr-48">
          <p className="text-white">{user.name}'s Projects</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {projects.map((project, index) => (
          <Box key={index} alignContent="center" m={2}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-gray-200">
              <img
                className="w-full"
                src="https://firebasestorage.googleapis.com/v0/b/my-first-project-portfol-6847b.appspot.com/o/rainforest.webp?alt=media&token=83cdb9b2-984c-46d7-98f2-d8cecd7fade2"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{project.name}</div>
                <p className="text-gray-700 text-base line-clamp-1">
                  {project.description}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-2 text-md font-semibold text-gray-700 mr-2 mb-2">
                  <div>
                    {project.status === "In Progress" ? (
                      <Text color="orange">#{project.status}</Text>
                    ) : project.status === "Done" ? (
                      <Text color="green">#{project.status}</Text>
                    ) : project.status === "Testing" ? (
                      <Text color="purple">#{project.status}</Text>
                    ) : project.status === "To Do" ? (
                      <Text color="red">#{project.status}</Text>
                    ) : null}
                  </div>
                </span>
              </div>
            </div>
          </Box>
        ))}
      </div>
    </Box>
  );
};

export default Projects;
