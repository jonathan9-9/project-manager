import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";

import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { UserStory } from "../Features/FeatureModal";

interface UserStoryProps {
  userStories: UserStory[];
  setUserStories: React.Dispatch<React.SetStateAction<UserStory[]>>;
  projectId: number;
  featureId: number | null;
}

const MakeUserStoryAccordion = ({
  userStories,
  setUserStories,
  featureId,
  projectId,
}: UserStoryProps) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submittedName, setSubmittedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submittedName;

  const onChangeName = (e: React.FormEvent) => {
    setSubmittedName(false);
    setName((e.target as HTMLInputElement).value);
  };

  const onChangeDescription = (e: React.FormEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
  };

  const onSubmitUserStory = async (e: any) => {
    e.preventDefault();
    setSubmittedName(true);

    if (name !== "") {
      try {
        setIsOpen(false);

        const token = localStorage.getItem("token");
        console.log("name", name);
        console.log("description", description);

        const data = {
          name: name,
          description: description,
          projectId: projectId,
          featureId: featureId,
        };

        const url = "http://localhost:3000/api/auth/create-user-story";
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
            description: "Unable to create user story",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top",
          });

          console.log("Error", res.statusText);

          return;
        } else {
          setSubmittedName(false);
          resetForm();

          const newUserStory = await res.json();

          setUserStories(newUserStory);

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
                <Box className="text-white flex flex-initial border-s-2">
                  <div className="ml-2">Add a user story</div>
                </Box>
              </AccordionButton>
            </h2>

            <AccordionPanel textColor="white" border="1px solid" pb={4}>
              <FormControl isInvalid={isErrorName} isRequired mb={4}>
                <FormLabel>User Story Name:</FormLabel>
                <Input type="text" value={name} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>
                    User story name is required.
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>User Story Description:</FormLabel>
                <Textarea value={description} onChange={onChangeDescription} />
              </FormControl>
              <Button w="100%" onClick={onSubmitUserStory}>
                Create User Story
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default MakeUserStoryAccordion;
