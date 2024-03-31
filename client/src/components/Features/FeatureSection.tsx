import { Box, useDisclosure } from "@chakra-ui/react";
import { Feature } from "../../pages/Project";
import FeatureModal from "./FeatureModal";
import { ProjectProps } from "../../pages/Projects";

interface Props {
  feature: Feature;
  projectId: number;
  setProject: React.Dispatch<React.SetStateAction<ProjectProps>>;
}

const FeatureSection = ({ feature, projectId, setProject }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <div className="text-gray-500">
            {feature.completedUserStories}/{feature.userStoryCount}
          </div>
        </div>
      </Box>
      <FeatureModal
        isOpen={isOpen}
        onClose={onClose}
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
