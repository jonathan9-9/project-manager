import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const sampleDevTasks = [
  {
    name: "Developer Tasks 1",
    status: "To Do",
  },
  {
    name: "Developer Tasks 2",
    status: "To Do",
  },
  {
    name: "Developer Tasks 3",
    status: "To Do",
  },
  {
    name: "Developer Tasks 4",
    status: "To Do",
  },
];

interface Props {
  projectId: number;
  featureId: number | null;
  userStoryId: number;
}

const CreateTaskAccordion = ({ featureId, projectId, userStoryId }: Props) => {
  const toast = useToast();
  const [name, setName] = useState("");

  const [submittedName, setSubmittedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submittedName;

  const onChangeName = (e: React.FormEvent) => {
    setSubmittedName(false);
    setName((e.target as HTMLInputElement).value);
  };

  const resetForm = () => {
    setName("");
  };

  const onSubmitUserStory = async (e: any) => {
    e.preventDefault();
    setSubmittedName(true);

    if (name !== "") {
      try {
        setIsOpen(false);

        const token = localStorage.getItem("token");
        console.log("name", name);

        const data = {
          name: name,
          projectId: projectId,
          featureId: featureId,
          userStoryId: userStoryId,
        };

        const url = "http://localhost:3000/api/auth/create-task";
        const fetchConfig = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        };

        const res = await fetch(url, fetchConfig);

        if (!res.ok) {
          toast({
            title: "Error",
            description: "Unable to create task",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });

          console.log("Error", res.statusText);

          return;
        } else {
          toast({
            title: "Success",
            description: "Your task has been created!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          setSubmittedName(false);
          resetForm();

          const newUserStory = await res.json();

          return newUserStory;
        }
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <Accordion allowToggle>
      <AccordionItem border="0px">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton onClick={() => setIsOpen(!isOpen)} h="58px">
                {isExpanded ? (
                  <MinusIcon fontSize="12px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
                <Box className="text-white flex flex-initial">
                  <div className="ml-2">Add a task</div>
                </Box>
              </AccordionButton>
            </h2>

            <AccordionPanel textColor="white" border="1px solid" pb={4}>
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>Task Name:</FormLabel>
                <Input type="text" value={name} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>Task name is required.</FormErrorMessage>
                )}
              </FormControl>

              <Button w="100%" onClick={onSubmitUserStory}>
                Create Task
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default CreateTaskAccordion;
