import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";
// import { UserProfileData } from "../../pages/Profile";
import { Project } from "../../pages/Projects";

interface Props {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const CreateProjectModal = ({ projects, setProjects }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submittedName, setSubmittedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setName("");
    setDescription("");
    setSubmittedName(false);
  };

  const onChangeName = (e: React.FormEvent) => {
    setSubmittedName(false);
    setName((e.target as HTMLInputElement).value);
  };

  const onChangeDescription = (e: React.FormEvent) => {
    setDescription((e.target as HTMLInputElement).value);
  };

  const onSubmitProjectCreation = async () => {
    setSubmittedName(true);

    if (name !== "") {
      const data = {
        name: name,
        description: description,
      };
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:3000/api/auth/create-project",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setProjects(responseData);

        closeModal();
      }
    }
  };

  const isErrorName = name === "" && submittedName;

  return (
    <div className="relative flex items-center space-x-8">
      <button
        onClick={openModal}
        className="p-2 bg-[#8c27ed] ml-2 text-white rounded-lg mb-3"
      >
        + New Project
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-700 bg-opacity-70 backdrop-blur-sm max-w-full transition-opacity duration-300 ease-in-out">
          <div className="bg-gray-700 shadow-md rounded-md p-6 max-w-md w-full">
            <h2 className="text-lg mb-4 font-bold text-gray-200">
              Create New Project
            </h2>
            <div className="mb-4">
              <label
                htmlFor="projectName"
                className="block text-gray-200 text-sm"
              >
                Project Name
              </label>
              <input
                type="text"
                id="projectName"
                value={name}
                onChange={onChangeName}
                className={`w-full p-2 border rounded ${
                  isErrorName ? "border-red-500" : "border-gray-500"
                } bg-gray-800 text-gray-200`}
              />
              {isErrorName && (
                <p className="text-red-500 mt-1 text-xs">
                  Project name is required
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="projectDescription"
                className="block text-gray-200 text-sm"
              >
                Project Description
              </label>
              <textarea
                id="projectDescription"
                value={description}
                onChange={onChangeDescription}
                className="w-full p-2 border rounded border-gray-500 bg-gray-800 text-gray-200"
              />
            </div>
            <div className="flex justify-end space-x-6">
              <button
                onClick={onSubmitProjectCreation}
                className="bg-purple-400 text-white px-4 py-2  rounded-md hover:bg-purple-600 focus:outline-none focus:ring focus:border-purple-300"
              >
                Create
              </button>
              <button
                onClick={closeModal}
                className=" text-gray-400 hover:text-gray-100 focus:outline-none px-3  ring-2 ring-offset-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateProjectModal;

{
  /* <Accordion allowToggle index={isOpen ? 0 : 1}>
  <AccordionItem>
    {({ isExpanded }) => (
      <>
        <h2>
          <AccordionButton
            border="1px solid black"
            ml={2}
            mt={2}
            p={3}
            onClick={() => setIsOpen(!!!isOpen)}
          >
            {isExpanded ? (
              <CloseIcon fontSize="10px" />
            ) : (
              <AddIcon fontSize="12px" />
            )}
            <Box textAlign="left" ml={2}>
              <Text className="text-blue-500">New Project</Text>
            </Box>
          </AccordionButton>
        </h2>
        <AccordionPanel pb={2} flex="1" border="1px solid black" ml={2}>
          <FormControl isInvalid={isErrorName} mb={4} isRequired>
            <FormLabel>Project Name:</FormLabel>
            <Input id="name" type="text" value={name} onChange={onChangeName} />
            {!isErrorName ? null : (
              <FormErrorMessage>Project name is required.</FormErrorMessage>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>Description: </FormLabel>
            <Textarea value={description} onChange={onChangeDescription} />
          </FormControl>
        </AccordionPanel>
      </>
    )}
  </AccordionItem>
</Accordion>; */
}
