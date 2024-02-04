import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Box bg="lightblue" borderRadius="md" p={2} m={10}>
        <Footer />
      </Box>
      <Outlet />
    </>
  );
}

export default App;
