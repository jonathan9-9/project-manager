import React from "react";
import { useLoaderData, useParams } from "react-router";
import { ProjectProps } from "./Projects";
import { Text } from "@chakra-ui/react";

const Project = () => {
  const { id } = useParams();
  const data = useLoaderData() as ProjectProps;
  console.log("Data", data);
  console.log("id", id);
  return (
    <div className="text-orange-400">
      <Text textAlign="center" mb={4} fontSize="20">
        {data.name}
      </Text>
    </div>
  );
};

export default Project;
