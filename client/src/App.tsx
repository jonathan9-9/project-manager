import { Box } from "@chakra-ui/react";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Box bg="gray" borderRadius="md" p={2} m={10}>
      <CreateUser />
    </Box>
  );
}

export default App;
