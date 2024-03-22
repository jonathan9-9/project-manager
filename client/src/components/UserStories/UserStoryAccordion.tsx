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
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";
import { useState } from "react";

type Props = {
  name: string;
  status: string;
  description: string;
  projectId: number;
  featureId: number | null;
  userStoryId: number;
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

const UserStoryAccordion = ({
  name,
  status,
  description,
  projectId,
  featureId,
  userStoryId,
}: Props) => {
  const [tasks, setTasks] = useState(sampleDevTasks);

  return (
    <Accordion allowToggle>
      <AccordionItem border="0px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            <Text flex={1} textAlign="left" textColor="white">
              <div className="text-[#D8D8D8]">{name}</div>
            </Text>

            <Text className="text-white">{status}</Text>

            <AccordionIcon color="white" />
          </AccordionButton>
        </h2>
        <AccordionPanel textColor="white" borderTop="1px" p={0}>
          <Box p={4}>{description}</Box>
          {tasks.map((task, idx) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                border="1px"
                alignItems="center"
                key={idx}
                px={4}
                py={2}
              >
                <Text>{task.name}</Text>
                <Button>{task.status}</Button>
              </Box>
            );
          })}
          <CreateTaskAccordion
            featureId={featureId}
            projectId={projectId}
            userStoryId={userStoryId}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryAccordion;
