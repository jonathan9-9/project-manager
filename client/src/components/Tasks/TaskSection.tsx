import { Box, Button, Text } from "@chakra-ui/react";
import { Task } from "../UserStories/UserStoryAccordion";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";

interface Props {
  task: Task;
  idx: number;
}

const TaskSection = ({ task, idx }: Props) => {
  const [taskStatus, setTaskStatus] = useState(task.status);

  const toast = useToast();
  const navigate = useNavigate();

  const updateTask = async (field: "status" | "name", value: string) => {
    try {
      const token = localStorage.getItem("token");

      const data = {
        field: field,
        value: value,
        taskId: task.id,
      };

      const url = "http://localhost:3000/api/auth/update-task";
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      const res = await fetch(url, fetchConfig);

      if (!res.ok) {
        toast({
          title: "Error",
          description: "Unable to update task. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });

        console.log("Error", res.statusText);

        return;
      } else {
        toast({
          title: "Success",
          description: `Your task ${field} has been updated!`,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        const newTask = await res.json();
        console.log("New task", newTask);

        return newTask;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTaskStatus = () => {
    if (taskStatus === "To Do") {
      setTaskStatus("In Progress");
      updateTask("status", "In Progress");
    } else if (taskStatus === "In Progress") {
      setTaskStatus("Done");
      updateTask("status", "Done");
    } else {
      setTaskStatus("To Do");
      updateTask("status", "To Do");
    }
    updateTask("status", taskStatus);
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
      <Button onClick={toggleTaskStatus}>{taskStatus}</Button>
    </Box>
  );
};

export default TaskSection;
