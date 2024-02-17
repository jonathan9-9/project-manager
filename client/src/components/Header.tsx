import { Box, Heading, Image } from "@chakra-ui/react";

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
          src="https://firebasestorage.googleapis.com/v0/b/my-first-project-portfol-6847b.appspot.com/o/vecteezy_suss-hundchen-hund-nein-hintergrund-logo-anwendbar-zu_27291212.png?alt=media&token=0df4b086-b59d-4b43-849b-381710d28236"
          // fallbackSrc="https://via.placeholder.com/150"
          alt="puppy logo"
          borderRadius="50%"
          boxSize="90px"
        />
        <Heading fontSize="26px" mt={5} mx={2}>
          Project Management Tool
        </Heading>
      </Box>
      <Box display="flex" justifyContent="space-around" w="70%">
        {components.map((component) => {
          return <Box>{component.name}</Box>;
        })}
      </Box>
    </Box>
  );
};

export default Header;
