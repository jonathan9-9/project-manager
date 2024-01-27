import { Button, Box } from "@chakra-ui/react";

function App() {
  return (
    <Box bg="black" borderRadius="md" p={2} m={10}>
      <Button colorScheme="pink" width="20%">
        Submit todo
      </Button>
    </Box>
  );
}

export default App;
