import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";

import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const ProjectAccordion = () => {
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
};

export default ProjectAccordion;
