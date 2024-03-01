import { useState } from "react";
// import { UserProfileData } from "../../pages/Profile";
import { ProjectProps } from "../../pages/Projects";
import { useToast } from "@chakra-ui/react";
import { GoPlus } from "react-icons/go";

interface Props {
  setProjects: React.Dispatch<React.SetStateAction<ProjectProps[]>>;
}

const CreateProjectModal = ({ setProjects }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submittedName, setSubmittedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

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

      try {
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

          toast({
            title: "Success",
            description: "Your project has been created!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          closeModal();
        } else {
          console.error(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error: ", error);
        toast({
          title: "Error",
          description: "Unable to create new project. Try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      }
    }
  };

  const isErrorName = name === "" && submittedName;

  return (
    <div className="relative flex items-center space-x-8">
      <button
        onClick={openModal}
        className="p-2 bg-[#CCCCFF] text-black rounded-lg mb-2  hover:ring-opacity-75 flex flex-row"
      >
        <GoPlus className="mt-1" /> New Project
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
