import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet, useLoaderData } from "react-router-dom";
import { useState } from "react";

interface Data {
  name: string;
  email: string;
  username: string;
  photo: string;
}

export interface Context {
  authenticated: boolean;
  toggleAuthenticated: () => void;
}

function App() {
  const data = useLoaderData() as Data | undefined;

  const [authenticated, setAuthenticated] = useState(
    data?.username !== undefined
  );

  const toggleAuthenticated = () => {
    setAuthenticated(!authenticated);
  };

  const context: Context = {
    authenticated,
    toggleAuthenticated,
  };

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Header authenticated={authenticated} />
        <hr />
        <Outlet context={context} />
        <Footer />
      </Box>
    </>
  );
}

export default App;
