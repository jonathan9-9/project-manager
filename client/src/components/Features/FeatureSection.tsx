import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { Feature } from "../../pages/Project";
import FeatureModal from "./FeatureModal";
import { ProjectProps } from "../../pages/Projects";
import { useNavigate } from "react-router";

interface Props {
  feature: Feature;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<ProjectProps>>;
}

const FeatureSection = ({ feature, projectId, setProject }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const onCloseModal = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/project/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },

          method: "GET",
        }
      );

      if (response.ok) {
        const project = await response.json();
        setProject(project);
        onClose();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "An error occurred",
        description: "Failed to load projects.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return navigate("/login");
    }
  };

  console.log("FEATURE", feature);
  return (
    <>
      <Box className="flex flex-col gap-4">
        <div
          onClick={() => {
            onOpen();
          }}
          className="bg-[#ff014f] cursor-pointer p-4 my-3 rounded-md flex flex-row justify-between items-center"
        >
          <div className="text-gray-100">{feature.name}</div>
          <div className="text-zinc-100">
            {feature.completedUserStories}/{feature.userStoryCount}
          </div>
        </div>
      </Box>
      <FeatureModal
        isOpen={isOpen}
        onClose={onCloseModal}
        featureName={feature ? feature.name : ""}
        featureDescription={
          (feature && feature.description) || "There is no feature description"
        }
        featureId={feature ? feature.id : null}
        projectId={projectId}
        stories={feature.userStories}
        setProject={setProject}
      />
    </>
  );
};

export default FeatureSection;
