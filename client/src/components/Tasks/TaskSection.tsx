import { Box, Button, Text } from "@chakra-ui/react";
import { Task } from "../UserStories/UserStoryAccordion";
import { useState } from "react";

interface Props {
  task: Task;
  idx: number;
}

const TaskSection = ({ task, idx }: Props) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  const toggleTaskStatus = () => {
    if (taskStatus === "To Do") {
      setTaskStatus("In Progress");
    } else if (taskStatus === "In Progress") {
      setTaskStatus("Done");
    } else {
      setTaskStatus("To Do");
    }
  };
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
      <Button onClick={toggleTaskStatus}>{task.status}</Button>
    </Box>
  );
};

export default TaskSection;
