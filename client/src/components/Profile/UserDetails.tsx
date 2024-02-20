import { Box, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";

import { FaUserEdit } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { isInvalidEmail } from "../../pages/SignUp";
import { UserProfileData } from "../../pages/Profile";

interface Props {
  username: string;
  field: string;
  value: string;
  setData: React.Dispatch<React.SetStateAction<UserProfileData>>;
}

const UserDetails = ({ field, value, username, setData }: Props) => {
  const [valueState, setValueState] = useState(value);
  const [editField, setEditField] = useState(false);

  const toast = useToast();

  const handleEditClick = () => {
    setEditField(!editField);
  };

  const handleCheckClick = async () => {
    if (field === "Email") {
      if (isInvalidEmail(valueState)) {
        toast({
          title: "Invalid Password",
          description: "Please enter a valid email address",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    } else {
      if (valueState === "") {
        toast({
          title: "Error",
          description: "Enter a valid value",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }
    const data = {
      username,
      field: field.toLowerCase(),
      value: valueState,
    };

    const token = localStorage.getItem("token");

    console.log("TOKEN", token);

    const response = await fetch(
      "http://localhost:3000/api/auth/edit-account-details",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        method: "POST",
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const res = await response.json();
      toast({
        title: "Success",
        description: `Successfully updated ${field.toLowerCase()}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setData(res);
    }

    setEditField(!editField);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(e.target.value);
  };
  const onPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (valueState.trim() === "") {
        console.error("Input cannot be empty. Please enter a value.");
      } else {
        if (editField) {
          await handleCheckClick();
        }
        setEditField(false);
      }
    }
  };

  return (
    <Flex>
      <Text lineHeight="32px" flex={1}>
        {field}
      </Text>
      {editField ? (
        <Input
          value={valueState}
          onChange={handleValueChange}
          onKeyDown={(e) => onPressEnter(e)}
          flex={1}
          height="28px"
          type={field === "Password" ? "password" : "text"}
        />
      ) : (
        <Text lineHeight="32px" flex={1}>
          {field === "Password" ? "***********" : valueState}
        </Text>
      )}
      <Box ml={8}>
        {editField ? (
          <GiCheckMark cursor="pointer" onClick={handleCheckClick} />
        ) : (
          <FaUserEdit cursor="pointer" onClick={handleEditClick} />
        )}
      </Box>
    </Flex>
  );
};

export default UserDetails;
