import { Box, Heading, Image } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box p={1} display="flex" border="1px solid black">
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/my-first-project-portfol-6847b.appspot.com/o/vecteezy_suss-hundchen-hund-nein-hintergrund-logo-anwendbar-zu_27291212.png?alt=media&token=0df4b086-b59d-4b43-849b-381710d28236"
        // fallbackSrc="https://via.placeholder.com/150"
        alt="puppy logo"
        borderRadius="50%"
        boxSize="90px"
      />
      <Heading fontSize="30px" mt={5} mx={2}>
        Project Management Tool
      </Heading>
    </Box>
  );
};

export default Header;
