import {
  Box,
  Text,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";

const sampleUserStories = [
  {
    name: "User story",
    status: "2/10",
  },
  {
    name: "User story",
    status: "3/7",
  },
  {
    name: "User story",
    status: "5/9",
  },
  {
    name: "User story",
    status: "1/5",
  },
  {
    name: "User story",
    status: "4/8",
  },
];

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FeatureModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent
          minW="fit-content"
          style={{ backgroundColor: "#23272b" }}
          className=" shadow-lg rounded-md p-4"
        >
          <Box m={10}>
            <Box mb={20}>
              <Text mb={4} fontSize={20} className="text-gray-300">
                Feature Name
              </Text>
              <Text className="text-gray-300">
                This is a description of the feature...
              </Text>
            </Box>
            <ModalCloseButton style={{ backgroundColor: "#ff014f" }} />
            <div className="flex flex-col gap-4 ">
              {sampleUserStories.map((story, storyIdx) => {
                return (
                  <div
                    key={storyIdx}
                    className="bg-gray-300 cursor-pointer p-4 rounded-md flex flex-row justify-between items-center"
                  >
                    <Text>{story.name}</Text>
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

// <Box
// key={storyIdx}
// border="1px"
// p={4}
// mt={4}
// display="flex"
// justifyContent="space-between"
// _hover={{ cursor: "pointer" }}
// w="100%"
// >
// <Text>{story.name}</Text>
// <Text>{story.status}</Text>
// </Box>
