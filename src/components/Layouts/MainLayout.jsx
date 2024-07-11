/* eslint-disable react/prop-types */
import { Container, Box } from "@chakra-ui/react";

const MainLayout = ({ children }) => {
  return (
    <Box w="100vw" h="100vh">
      <Container
        w={{ base: "100%", md: "container.sm" }}
        h="100vh"
        bg="#1E1E1E"
        centerContent
      >
        <Box w="100%" p={4} color="#7ECA9C">
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default MainLayout;
