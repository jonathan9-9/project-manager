import { Box, Heading, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const components = [
  { name: "Log in", path: "/login" },
  { name: "Create an Account", path: "/sign-up" },
  { name: "Projects", path: "/projects" },
  { name: "Account Details", path: "/profile" },
];

const Header = () => {
  return (
    <Box display="flex" p={4} alignItems="center">
      <Box p={1} display="flex" alignItems="center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/my-first-project-portfol-6847b.appspot.com/o/vecteezy_watercolor-paintings-of-a-black-crow-bird-ai-generated_33053087.png?alt=media&token=a5b0f204-b95b-44e3-8db5-fbfef6a4719c"
          fallbackSrc="https://via.placeholder.com/150"
          alt="puppy logo"
          borderRadius="50%"
          boxSize="100px"
        />
        <Heading fontSize="26px" mt={5} mx={2}>
          Project Management Tool
        </Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" w="70%">
        {components.map((component) => {
          return (
            <NavLink
              to={component.path}
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "black",
                };
              }}
            >
              <Box
                borderBottom="2px"
                borderColor="transparent"
                _hover={{
                  borderColor: "#0077B5",
                  transition: "border-color 0.5s ease-in-out",
                }}
              >
                {component.name}
              </Box>
            </NavLink>
          );
        })}
      </Box>
    </Box>
  );
};

export default Header;
