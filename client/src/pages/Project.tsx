import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router";
import { ProjectProps } from "./Projects";
import { Box, Text } from "@chakra-ui/react";

interface Feature {
  name: string;
  status: "To Do" | "In Progress" | "Done";
  userStoryCount: number;
  completedUserStories: number;
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

const features: Feature[] = [
  {
    name: "Feature C",
    status: "In Progress",
    userStoryCount: 10,
    completedUserStories: 3,
  },
  {
    name: "Feature H",
    status: "Done",
    userStoryCount: 10,
    completedUserStories: 10,
  },
  {
    name: "Feature G",
    status: "Done",
    userStoryCount: 7,
    completedUserStories: 7,
  },
  {
    name: "Feature K",
    status: "To Do",
    userStoryCount: 5,
    completedUserStories: 0,
  },
  {
    name: "Feature P",
    status: "In Progress",
    userStoryCount: 10,
    completedUserStories: 4,
  },
];

const Project = () => {
  const { id } = useParams();
  const data = useLoaderData() as ProjectProps[];

  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [featureName, setFeatureName] = useState("");
  const [featureDescription, setFeatureDescription] = useState("");

  const handleAddCardClick = (index: any) => {
    setSelectedCardIndex(index);
  };

  const handleCancelClick = () => {
    setSelectedCardIndex(null);
    resetForm();
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    if (featureName !== "") {
      try {
        console.log("Feature name", featureName);
        console.log("Feature description", featureDescription);
        const response = await fetch("your-api-endpoint", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: featureName,
            description: featureDescription,
          }),
        });

        const responseData = await response.json();
        console.log(responseData);

        handleCancelClick();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const resetForm = () => {
    setFeatureName("");
    setFeatureDescription("");
  };

  console.log("id", id);

  return (
    <Box className="text-white">
      <div className="text-[#CCCCFF]">
        <Text textAlign="center" mb={4} fontSize="20">
          {data[0].name}
        </Text>
        <Text textAlign="center" mb={4} fontSize="14">
          {data[0].description || "There is no project description"}
        </Text>
      </div>
      <Box className="flex flex-row justify-around flex-wrap gap-4 p-4">
        {columns.map((column, index) => {
          const filteredFeatures = features.filter(
            (feature) => feature.status === column.name
          );

          return (
            <div
              key={index}
              className="bg-white shadow-lg rounded-md p-4 w-72 mb-4 "
            >
              <div className="text-center text-gray-800 font-bold text-lg mb-2">
                {column.name}
              </div>
              <Box className="flex flex-col gap-4">
                {filteredFeatures.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-gray-100 p-4 rounded-md flex flex-row justify-between items-center"
                  >
                    <div className="text-gray-800">{feature.name}</div>
                    <div className="text-gray-500">
                      {feature.completedUserStories}/{feature.userStoryCount}
                    </div>
                  </div>
                ))}
              </Box>
              <div
                onClick={() => handleAddCardClick(index)}
                className="mt-4 text-gray-600 text-sm cursor-pointer"
              >
                Add a card...
              </div>
              {selectedCardIndex === index && (
                <form onSubmit={handleFormSubmit} className="mt-4">
                  <div className="mb-2">
                    <input
                      type="text"
                      placeholder="Feature Name"
                      value={featureName}
                      onChange={(e) => setFeatureName(e.target.value)}
                      className="p-2 w-full border rounded-md text-black"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <textarea
                      placeholder="Feature Description"
                      value={featureDescription}
                      onChange={(e) => setFeatureDescription(e.target.value)}
                      className="p-2 w-full border rounded-md text-black"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="p-2 bg-green-500 text-white rounded-md mr-2"
                    >
                      Add Card
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelClick}
                      className="p-2 bg-red-500 text-white rounded-md"
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
