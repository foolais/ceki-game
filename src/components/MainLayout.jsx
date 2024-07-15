/* eslint-disable react/prop-types */
import { Container, Box } from "@chakra-ui/react";

const MainLayout = ({ children }) => {
  return (
    <Box w="100vw" h={{ base: "90vh", sm: "100vh" }} bg="#1e1e1e">
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
      >
        <Box w="100%" p={4} color="teal">
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
