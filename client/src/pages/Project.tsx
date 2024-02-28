import React from "react";
import { useParams } from "react-router";

const Project = () => {
  const { id } = useParams();
  console.log("id", id);
  return <div className="text-orange-400">Project</div>;
};

export default Project;
