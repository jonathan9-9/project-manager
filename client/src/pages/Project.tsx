import React from "react";
import { useLoaderData, useParams } from "react-router";
import { ProjectProps } from "./Projects";
import { Box, Text } from "@chakra-ui/react";

const columns = [
  {
    name: "To Do",
  },
  {
    name: "In Progress",
  },
  {
    name: "Done",
  },
];

const Project = () => {
  const { id } = useParams();
  const data = useLoaderData() as ProjectProps[];

  console.log("id", id);
  return (
    <Box>
      <div className="text-orange-400">
        <Text textAlign="center" mb={4} fontSize="20">
          {data[0].name}
        </Text>
        <Text textAlign="center" mb={4} fontSize="14">
          {data[0].description || "There is no project description"}
        </Text>
      </div>
      <Box className="flex flex-column justify-center gap-44">
        {columns.map((column, index) => {
          return (
            <div
              key={index}
              className="border border-orange-400 m-2 p-4 sm:w-1/2 lg:w-1/3 xl:w-1/4 h-16 sm:h-20 md:h-24 lg:h-32 xl:h-40"
              style={{ width: "400px", height: "50px" }}
            >
              <div className="text-center text-white">{column.name}</div>
            </div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Project;
