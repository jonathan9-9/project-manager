import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";

import { ProjectProps } from "../../pages/Projects";
import TaskSection from "../Tasks/TaskSection";

type Props = {
  name: string;
  status: string;
  description: string;
  projectId: number;
  featureId: number | null;
  userStoryId: number;
  tasks: Task[];
  setProject: React.Dispatch<React.SetStateAction<ProjectProps>>;
};

export type Task = {
  name: string;
  status: string;
};

const UserStoryAccordion = ({
  name,
  status,
  description,
  projectId,
  featureId,
  userStoryId,
  tasks,
  setProject,
}: Props) => {
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
            return <TaskSection task={task} idx={idx} />;
          })}
          <CreateTaskAccordion
            featureId={featureId}
            projectId={projectId}
            userStoryId={userStoryId}
            setProject={setProject}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default UserStoryAccordion;
