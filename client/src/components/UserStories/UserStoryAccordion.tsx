import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";

type Props = {
  name: string;
  status: string;
  description: string;
};

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

const UserStoryAccordion = ({ name, status, description }: Props) => {
  return (
    <Accordion allowToggle>
      <AccordionItem border="0px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left" textColor="white">
              {name}
            </Text>

            <Text className="text-white">{status}</Text>

            <AccordionIcon color="white" />
          </AccordionButton>
        </h2>
        <AccordionPanel textColor="white">
          <Box>{description}</Box>
          {sampleDevTasks.map((task, idx) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                border="1px"
                alignItems="center"
                key={idx}
              >
                <Text>{task.name}</Text>
                <Button>{task.status}</Button>
              </Box>
            );
          })}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryAccordion;
