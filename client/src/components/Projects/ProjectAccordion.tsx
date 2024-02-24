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

  const onSubmitProjectCreation = () => {
    setSubmittedName(true);

    setIsOpen(false);

    setProjects([
      ...projects,
      {
        name,
        description,
        status: "Done",
      },
    ]);

    setName("");
    setDescription("");

    setSubmittedName(false);

    console.log("NAME", name);
    console.log("DESCRIPTION:", description);
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
