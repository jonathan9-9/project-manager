import {
  Box,
  Text,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import UserStoryAccordion from "../UserStories/UserStoryAccordion";
import MakeUserStoryAccordion from "../UserStories/MakeUserStoryAccordion";
import { useState } from "react";

// const sampleUserStories = [
//   {
//     name: "User Story",
//     status: "2/10",
//     description: "This is the user story description",
//   },
//   {
//     name: "User Story",
//     status: "3/7",
//     description: "This is the user story description",
//   },
//   {
//     name: "User Story",
//     status: "5/9",
//     description: "This is the user story description",
//   },
//   {
//     name: "User Story",
//     status: "1/5",
//     description: "This is the user story description",
//   },
//   {
//     name: "User Story",
//     status: "4/8",
//     description: "This is the user story description",
//   },
// ];

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  featureId: number | null;
  projectId: number;
  stories: UserStory[];
  // setUserStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
}

export interface UserStory {
  name: string;
  description: string;
  status: string;
}

const FeatureModal = ({
  isOpen,
  onClose,
  featureName,
  featureDescription,
  featureId,
  projectId,
  stories,
}: ModalProps) => {
  const [userStories, setUserStories] = useState(stories);

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
          className="shadow-lg rounded-md p-4"
        >
          <Box m={10}>
            <Box mb={20}>
              <Text mb={4} fontSize={20} className="text-gray-300">
                {featureName}
              </Text>
              <Text className="text-gray-300">{featureDescription}</Text>
            </Box>
            <ModalCloseButton style={{ backgroundColor: "#ff014f" }} />
            <div className="flex flex-col gap-4 bg-[#1e2024] rounded-lg p-6">
              {userStories.map((story, storyIdx) => (
                <div key={storyIdx} className="mb-2">
                  <UserStoryAccordion
                    name={story.name}
                    status={story.status}
                    description={story.description}
                  />
                </div>
              ))}
              <MakeUserStoryAccordion
                userStories={userStories}
                setUserStories={setUserStories}
                featureId={featureId}
                projectId={projectId}
              />
            </div>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeatureModal;
