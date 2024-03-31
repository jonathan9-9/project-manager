import { Box, Text } from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router";
import { UserProfileData } from "./Profile";

import { useState } from "react";
import CreateProjectModal from "../components/Projects/CreateProjectModal";
import { Feature } from "./Project";

export interface ProjectProps {
  id: number;
  name: string;
  description: string;
  status: string;
  features: Feature[];
}

interface LoaderDataType {
  user: UserProfileData;
  projects: ProjectProps[];
}

const Projects = () => {
  const data = useLoaderData() as LoaderDataType;

  const user = data.user as UserProfileData;
  console.log("Loader Data", data);

  const navigate = useNavigate();
  const [projects, setProjects] = useState(data.projects);

  const navigateToProject = (id: number) => {
    navigate(`/project/${id}`);
  };

  return (
    <Box>
      <div className="flex items-center justify-center">
        <div className="flex items-center space-x-8">
          <div className="text-2xl ml-4 text-white mb-3">All projects</div>

          <CreateProjectModal setProjects={setProjects} />
        </div>
        <div className="text-center flex-grow mr-48">
          <p className="text-white">{user.name}'s Projects</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {projects.map((project, idx) => (
          <Box
            key={idx}
            alignContent="center"
            m={2}
            cursor="pointer"
            className="transition-transform hover:scale-105 shadow-lg duration-300 ease-in-out "
            onClick={() => {
              navigateToProject(project.id);
            }}
          >
            <div className="max-w-xs rounded overflow-hidden bg-[#212428] shadow-[10px 10px 19px #1c1e22, -10px -10px 19px #262a2e] bg-gradient-to-r from-[#212428] to-[#202327] group hover:bg-gradient-to-b hover:from-black hover:to-[#1e2024] transition-colors duration-100 group ">
              <img
                className="w-full"
                src="https://firebasestorage.googleapis.com/v0/b/my-first-project-portfol-6847b.appspot.com/o/alpines.jpeg?alt=media&token=6891a518-8067-4f66-a74f-32511c8ac768"
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-2">
                <div className="font-bold text-xl mb-2 text-gray-300">
                  {project.name}
                </div>
                <p className="text-gray-200 text-base line-clamp-1">
                  {project.description}
                </p>
              </div>
              <div className="px-6 pt-2 pb-2">
                <span className="inline-block bg-gray-700 rounded-full px-1  text-md font-semibold text-gray-700 mr-2 mb-2">
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
