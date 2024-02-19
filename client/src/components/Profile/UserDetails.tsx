import { Box, Flex, Text } from "@chakra-ui/react";

import { FaUserEdit } from "react-icons/fa";

interface Props {
  field: string;
  value: string;
}

const UserDetails = ({ field, value }: Props) => {
  return (
    <Flex>
      <Text lineHeight="32px" flex={1}>
        {field}
      </Text>
      <Text lineHeight="32px" flex={1}>
        {value}
      </Text>
      <Box>
        <FaUserEdit cursor="pointer" onClick={() => {}} />
      </Box>
    </Flex>
  );
};

export default UserDetails;
