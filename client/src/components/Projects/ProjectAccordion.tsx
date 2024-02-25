import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
// import { UserProfileData } from "../../pages/Profile";
import { Project } from "../../pages/Projects";

interface Props {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectAccordion = ({ projects, setProjects }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [submittedName, setSubmittedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onChangeName = (e: React.FormEvent) => {
    setSubmittedName(false);
    setName((e.target as HTMLInputElement).value);
  };
  const onChangeDescription = (e: React.FormEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  };

  const onSubmitProjectCreation = async () => {
    setSubmittedName(true);

    if (name !== "") {
      const data = {
        name: name,
        description: description,
      };
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/auth/create-project",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("RES", response);
      }
      setProjects([
        ...projects,
        {
          name,
          description,
          status: "Done",
        },
      ]);

      setIsOpen(false);
      setName("");
      setDescription("");
      // To prevent from isInvalid prop from erroring out set setSubmittedName to false;
      setSubmittedName(false);
    }
  };

  const isErrorName = name === "" && submittedName;
  return (
    <Accordion allowToggle index={isOpen ? 0 : 1}>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton
                border="1px solid black"
                ml={2}
                mt={2}
                p={3}
                onClick={() => setIsOpen(!!!isOpen)}
              >
                {isExpanded ? (
                  <CloseIcon fontSize="10px" />
                ) : (
                  <AddIcon fontSize="12px" />
                )}
                <Box textAlign="left" ml={2}>
                  Add a project
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={2} flex="1" border="1px solid black" ml={2}>
              <FormControl isInvalid={isErrorName} mb={4} isRequired>
                <FormLabel>Project Name:</FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={onChangeName}
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>Project name is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Description: </FormLabel>
                <Textarea value={description} onChange={onChangeDescription} />
              </FormControl>
              <Button mt={4} w="100%" onClick={onSubmitProjectCreation}>
                Create
              </Button>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default ProjectAccordion;
