import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import { Task } from "../UserStories/UserStoryAccordion";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { ProjectProps } from "../../pages/Projects";
import { GiCheckMark } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";

interface Props {
  task: Task;
  idx: number;
  setProject: React.Dispatch<React.SetStateAction<ProjectProps>>;
}

const TaskSection = ({ task, idx, setProject }: Props) => {
  const [taskStatus, setTaskStatus] = useState(task.status);

  const [taskName, setTaskName] = useState(task.name);
  const [updateName, setUpdateName] = useState(false);

  const handleEditClick = () => {
    setUpdateName(!updateName);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const toast = useToast();
  const navigate = useNavigate();

  const onSubmitUpdateTask = async (
    field: "status" | "name",
    value: string
  ) => {
    try {
      if (taskName === "") {
        toast({
          title: "Error",
          description: "Enter a valid task name",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setTaskName(task.name);
        return;
      }
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

        const updatedTask = await res.json();
        console.log("updatedTask", updatedTask);
        setUpdateName(false);
        setProject(updatedTask);
        return updatedTask;
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTaskStatus = async () => {
    let newStatus = "";
    if (taskStatus === "To Do") {
      newStatus = "In Progress";
    } else if (taskStatus === "In Progress") {
      newStatus = "Done";
    } else {
      newStatus = "To Do";
    }
    setTaskStatus(newStatus);
    await onSubmitUpdateTask("status", newStatus);
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      // border="1px"
      alignItems="center"
      key={idx}
      px={4}
      py={2}
      gap={4}
    >
      {updateName ? (
        <Input
          className="text-gray-200"
          value={taskName}
          onChange={handleValueChange}
          flex={1}
          height="28px"
          type="text"
        />
      ) : (
        <Text flex={1}>{task.name}</Text>
      )}
      <Box display="flex" alignItems="center">
        <Box className="text-gray-200" mr={1}>
          {updateName ? (
            <GiCheckMark
              cursor="pointer"
              onClick={
                updateName
                  ? () => {
                      onSubmitUpdateTask("name", taskName);
                    }
                  : handleEditClick
              }
            />
          ) : (
            <FaUserEdit cursor="pointer" onClick={handleEditClick} />
          )}
        </Box>
      </Box>

      <Button w="17%" onClick={toggleTaskStatus}>
        {taskStatus}
      </Button>
    </Box>
  );
};

export default TaskSection;
