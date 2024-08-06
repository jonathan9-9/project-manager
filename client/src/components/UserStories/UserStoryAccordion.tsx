import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
  Input,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";

import { ProjectProps } from "../../pages/Projects";
import TaskSection from "../Tasks/TaskSection";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";

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
  id: number;
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
  const [storyStatus, setStoryStatus] = useState(status);
  const [updateStoryName, setUpdateStoryName] = useState(false);

  const [storyName, setStoryName] = useState(name);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryName(e.target.value);
  };

  const handleEditClick = () => {
    setUpdateStoryName(!updateStoryName);
  };

  return (
    <Accordion allowToggle>
      <AccordionItem border="0px">
        <h2>
          <AccordionButton display="flex" justifyContent="space-between" p={4}>
            {updateStoryName ? (
              <Input
                className="text-gray-200"
                value={storyName}
                onChange={onChange}
                flex={1}
                height="28px"
                type="text"
              />
            ) : (
              <Text flex={1} textAlign="left" textColor="white">
                <div className="text-[#D8D8D8]">{name}</div>
              </Text>
            )}
            {updateStoryName ? (
              <GiCheckMark
                cursor="pointer"
                onClick={updateStoryName ? () => {} : handleEditClick}
              />
            ) : (
              <FaUserEdit cursor="pointer" onClick={handleEditClick} />
            )}

            <Text className="text-white">{storyStatus}</Text>

            <AccordionIcon color="white" />
          </AccordionButton>
        </h2>
        <AccordionPanel textColor="white" borderTop="1px" p={0}>
          <Box p={4}>{description}</Box>
          {tasks.map((task, idx) => {
            return (
              <TaskSection
                task={task}
                idx={idx}
                setStoryStatus={setStoryStatus}
              />
            );
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
