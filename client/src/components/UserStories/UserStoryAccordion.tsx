import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
  Box,
  Input,
  useToast,
} from "@chakra-ui/react";
import CreateTaskAccordion from "../Tasks/CreateTaskAccordion";

import { ProjectProps } from "../../pages/Projects";
import TaskSection from "../Tasks/TaskSection";
import { useState } from "react";
import { GiCheckMark } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import { redirect } from "react-router-dom";

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

  const toast = useToast();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryName(e.target.value);
  };

  const handleEditClick = () => {
    setUpdateStoryName(!updateStoryName);
  };

  const onSubmitUpdateStory = async (
    field: "name" | "description",
    value: string
  ) => {
    try {
      if (storyName === "") {
        toast({
          title: "Error",
          description: "Enter a valid user story name",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setStoryName(name);
        return;
      }
      const token = localStorage.getItem("token");

      const data = {
        field: field,
        value: value,
        userStoryId: userStoryId,
      };

      const url = "http://localhost:3000/api/auth/update-user-story";
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

        const updatedUserStory = await res.json();

        setUpdateStoryName(false);

        return updatedUserStory;
      }
    } catch (e) {
      console.error(e);
      toast({
        title: "An error occurred",
        description: "Failed to load user stories.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return redirect("/login");
    }
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
                color="red"
                className="mr-4"
                cursor="pointer"
                onClick={
                  updateStoryName
                    ? () => {
                        onSubmitUpdateStory("name", storyName);
                      }
                    : handleEditClick
                }
              />
            ) : (
              <FaUserEdit
                color="red"
                cursor="pointer"
                onClick={handleEditClick}
                className="mr-4"
              />
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
