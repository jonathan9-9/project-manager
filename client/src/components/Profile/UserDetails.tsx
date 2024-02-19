import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

import { FaUserEdit } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";

interface Props {
  field: string;
  value: string;
}

const UserDetails = ({ field, value }: Props) => {
  const [valueState, setValueState] = useState(value);
  const [editField, setEditField] = useState(false);

  const handleEditClick = () => {
    setEditField(!editField);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueState(e.target.value);
  };
  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (valueState.trim() === "") {
        console.error("Input cannot be empty. Please enter a value.");
      } else {
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
        />
      ) : (
        <Text lineHeight="32px" flex={1}>
          {valueState}
        </Text>
      )}
      <Box ml={8}>
        {editField ? (
          <GiCheckMark cursor="pointer" onClick={handleEditClick} />
        ) : (
          <FaUserEdit cursor="pointer" onClick={handleEditClick} />
        )}
      </Box>
    </Flex>
  );
};

export default UserDetails;
