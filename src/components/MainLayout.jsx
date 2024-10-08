/* eslint-disable react/prop-types */
import { Container, Box } from "@chakra-ui/react";
import Navbar from "./Navbar";

const MainLayout = ({ children, isWithNavbar = true }) => {
  return (
    <Box w="100vw" h={{ base: "95vh", sm: "100vh" }} bg="#1e1e1e">
      <Container
        w={{ base: "100%", md: "container.sm" }}
        h="100%"
        bg="white"
        centerContent
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
        pos={"relative"}
      >
        {isWithNavbar && <Navbar />}
        <Box w="100%" p={4} color="teal">
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
