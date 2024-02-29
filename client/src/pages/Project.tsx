import React from "react";
import { useLoaderData, useParams } from "react-router";

const Project = () => {
  const { id } = useParams();
  const data = useLoaderData();
  console.log("Data", data);
  console.log("id", id);
  return <div className="text-orange-400">Project</div>;
};

export default Project;
