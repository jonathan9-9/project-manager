import { useState } from "react";
import { useLoaderData } from "react-router";
import { ProjectProps } from "./Projects";
import { Box, Text } from "@chakra-ui/react";
import { UserStory } from "../components/Features/FeatureModal";
import FeatureSection from "../components/Features/FeatureSection";

export interface Feature {
  name: string;
  status: "To Do" | "In Progress" | "Done";
  userStoryCount: number;
  completedUserStories: number;
  description?: string;
  id: number;
  userStories: UserStory[];
}

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
  // const { id } = useParams();
  const loaderData = useLoaderData() as ProjectProps;

  const [project, setProject] = useState(loaderData);

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [featureName, setFeatureName] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");
  // const [features, setFeatures] = useState(project.features);
  // const [selectedFeature, setSelectedFeature] = useState(project.features[0]);
  // const [userStories, setUserStories] = useState(selectedFeature.userStories);

  const handleAddCardClick = (index: any) => {
    setSelectedCardIndex(index);
  };

  const resetForm = () => {
    setFeatureName("");
    setFeatureDescription("");
  };

  const handleCancellation = () => {
    resetForm();
    setSelectedCardIndex(null);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    console.log("PROJECT ID", project.id);

    if (featureName !== "") {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:3000/api/auth/create-feature",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: featureName,
              description: featureDescription,
              projectId: project.id,
            }),
          }
        );

        if (!response.ok) {
          console.error("Error:", response.statusText);
          return;
        } else {
          const newFeature = await response.json();

          console.log("new feature DEBUG", newFeature);

          setProject(newFeature);
          resetForm();
          setSelectedCardIndex(null);
          return newFeature;
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Box className="text-white">
      <div className="text-[#c4cfde]">
        <Text textAlign="center" mb={4} fontSize="20">
          {project.name}
        </Text>
        <Text textAlign="center" mb={4} fontSize="14">
          {project.description || "There is no project description"}
        </Text>
      </div>
      <Box className="flex flex-row justify-around flex-nowrap gap-4 p-4">
        {columns.map((column, index) => {
          return (
            <div
              key={index}
              className="bg-[#23272b] shadow-lg rounded-md p-4 w-72 mb-4 "
            >
              <div className="text-center text-gray-200 font-bold text-lg mb-2">
                {column.name}
              </div>
              {project.features.map((feature, featureIdx) => {
                // feature.status = "To Do";
                if (column.name === feature.status) {
                  return (
                    <FeatureSection
                      key={featureIdx}
                      feature={feature}
                      projectId={project.id}
                      setProject={setProject}
                    />
                  );
                } else {
                  return null;
                }
              })}

              <div
                onClick={() => handleAddCardClick(index)}
                className="mt-4 text-gray-200 text-sm cursor-pointer"
              >
                Add a feature...
              </div>

              {selectedCardIndex === index && (
                <form className="mt-4 ">
                  <div className="mb-2 text-black">
                    <input
                      type="text"
                      placeholder="Feature Name"
                      value={featureName}
                      onChange={(e) => setFeatureName(e.target.value)}
                      className="p-2 w-full border rounded-lg text-white bg-[#1e2024]"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      placeholder="Feature Description"
                      value={featureDescription}
                      onChange={(e) => setFeatureDescription(e.target.value)}
                      className="p-2 w-full border rounded-md text-white bg-[#1e2024]"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      onClick={handleFormSubmit}
                      className="p-2 bg-white text-black rounded-md mr-2"
                    >
                      Add Feature
                    </button>
                    <button
                      type="button"
                      onClick={handleCancellation}
                      className="p-2 bg-[#ff014f] text-white rounded-md"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          );
        })}
      </Box>
    </Box>
  );
};
export default Project;
