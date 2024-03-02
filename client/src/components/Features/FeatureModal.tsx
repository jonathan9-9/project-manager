import {
  Box,
  Text,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
// import { Feature } from "../../pages/Project";

const sampleUserStories = [
  {
    name: "User Story",
    status: "2/10",
    description: "This is the user story description",
  },
  {
    name: "User Story",
    status: "3/7",
    description: "This is the user story description",
  },
  {
    name: "User Story",
    status: "5/9",
    description: "This is the user story description",
  },
  {
    name: "User Story",
    status: "1/5",
    description: "This is the user story description",
  },
  {
    name: "User Story",
    status: "4/8",
    description: "This is the user story description",
  },
];

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  // setSelectedFeature: React.Dispatch<React.SetStateAction<Feature>>;
};

const FeatureModal = ({
  isOpen,
  onClose,
  featureName,
  featureDescription,
}: ModalProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          minW="70%"
          style={{ backgroundColor: "#23272b" }}
          className=" shadow-lg rounded-md p-4"
        >
          <Box m={10}>
            <Box mb={20}>
              <Text mb={4} fontSize={20} className="text-gray-300">
                {featureName}
              </Text>
              <Text className="text-gray-300">{featureDescription}</Text>
            </Box>
            <ModalCloseButton style={{ backgroundColor: "#9CA3AF" }} />
            <div className="flex flex-col gap-4">
              {sampleUserStories.map((story, storyIdx) => {
                return (
                  <div
                    key={storyIdx}
                    className="bg-[#ff014f] cursor-pointer p-4 rounded-md flex flex-row justify-between"
                  >
                    <Text>
                      {story.name} {storyIdx + 1}
                    </Text>
                    <Text>{story.status}</Text>
                  </div>
                );
              })}
            </div>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeatureModal;
