import { Box, Heading, Image } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const components = [
  { name: "Log in", path: "/login", showWhenAuthenticated: false },
  { name: "Create an Account", path: "/sign-up", showWhenAuthenticated: false },
  { name: "Projects", path: "/projects", showWhenAuthenticated: true },
  { name: "Account Details", path: "/profile", showWhenAuthenticated: true },
];

interface Props {
  authenticated: boolean;
}

const Header = ({ authenticated }: Props) => {
  return (
    <Box display="flex" p={4} alignItems="center">
      <Box p={1} display="flex" alignItems="center">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/my-first-project-portfol-6847b.appspot.com/o/vecteezy_ribbon-banner-icon-png-ribbon-transparent_21665063.png?alt=media&token=565ab3f3-8337-4380-b7f7-f4f9e8338667"
          fallbackSrc="https://via.placeholder.com/150"
          alt="black crow"
          borderRadius="70%"
          boxSize="75px"
        />
        <Heading fontSize="25px" mt={5} mx={2} className="text-white">
          Unifier
        </Heading>
      </Box>

      <Box display="flex" justifyContent="space-around" w="70%">
        {components.map((component) => {
          if (
            (authenticated && component.showWhenAuthenticated) ||
            (!authenticated && !component.showWhenAuthenticated)
          ) {
            return (
              <NavLink
                to={component.path}
                key={component.name}
                style={({ isActive, isPending }) => {
                  return {
                    fontWeight: isActive ? "bold" : "",
                    color: isPending ? "red" : "white",

                    borderBottom: isActive ? "2px solid #9147ff" : "",
                  };
                }}
              >
                <Box
                  borderBottom="2px"
                  borderColor="transparent"
                  _hover={{
                    borderColor: "#9147ff",
                    transition: "border-color 0.9s ease-in-out",
                  }}
                >
                  {component.name}
                </Box>
              </NavLink>
            );
          } else {
            return null;
          }
        })}
      </Box>
    </Box>
  );
};

export default Header;
