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

const MakeUserStoryAccordion = () => {
  const toast = useToast();

  // REMOVE comment
  console.log("example toast", toast);

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

  const onSubmitUserStory = () => {
    setSubmittedName(true);

    if (name !== "") {
      setIsOpen(false);

      const token = localStorage.getItem("token");

      // REMOVE
      console.log("token", token);
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
                <Box as="span" flex="1" textAlign="left" ml={3}>
                  Add a user story
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
