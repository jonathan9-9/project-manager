import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}

export default App;
