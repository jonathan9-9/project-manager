import {
  Box,
  Text,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import UserStoryAccordion, { Task } from "../UserStories/UserStoryAccordion";
import CreateUserStoryAccordion from "../UserStories/CreateUserStoryAccordion";
import { ProjectProps } from "../../pages/Projects";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
  featureDescription: string;
  featureId: number | null;
  projectId: number;
  stories: UserStory[];
  setProject: React.Dispatch<React.SetStateAction<ProjectProps>>;

  // setUserStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
}

export interface UserStory {
  name: string;
  description: string;
  id: number;
  tasks: Task[];
  completedTasks: number;
  taskCount: number;
}

const FeatureModal = ({
  isOpen,
  onClose,
  featureName,
  featureDescription,
  featureId,
  projectId,
  stories,
  setProject,
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
              {stories.map((story, storyIdx) => (
                <div key={storyIdx} className="mb-2">
                  <UserStoryAccordion
                    name={story.name}
                    status={`${story.completedTasks} / ${story.taskCount}`}
                    description={story.description}
                    featureId={featureId}
                    projectId={projectId}
                    userStoryId={story.id}
                    tasks={story.tasks}
                    setProject={setProject}
                  />
                </div>
              ))}
              <CreateUserStoryAccordion
                // userStories={userStories}
                // setUserStories={setUserStories}
                featureId={featureId}
                projectId={projectId}
                setProject={setProject}
              />
            </div>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FeatureModal;
