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

const ProjectAccordion = () => {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState(false);

  const [description, setDescription] = useState("");

  const onChangeName = (e: React.FormEvent) => {
    setName((e.target as HTMLInputElement).value);
  };
  const onChangeDescription = (e: React.FormEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  };

  const isErrorName = name === "" && submittedName;
  return (
    <Accordion allowMultiple>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton border="1px solid black" ml={2} mt={2} p={3}>
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
              <FormControl isInvalid={isErrorName} isRequired>
                <FormLabel>Project Name:</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={name}
                  onChange={onChangeName}
                />
                {!isErrorName ? null : (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>

              <FormControl>
                <FormLabel>Description: </FormLabel>
                <Textarea value={description} onChange={onChangeDescription} />
              </FormControl>
              <Button w="100%" onClick={() => {}}>
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
