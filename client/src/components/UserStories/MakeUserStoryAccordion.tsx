import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Button,
  Box,
} from "@chakra-ui/react";

const MakeUserStoryAccordion = () => {
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
              <FormControl isInvalid="" isRequired mb={4}>
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
