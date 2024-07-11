import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MainLayout from "../components/MainLayout";
import cardGame from "../assets/cardGame.lottie";
import { Heading, Box, Button, Stack } from "@chakra-ui/react";

const lottieBoxStyle = {
  maxWidth: "400px",
  minHeight: "225px",
  overflow: "hidden",
};

const HomePage = () => {
  return (
    <MainLayout>
      <Box
        h="80vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Heading as="h1" size="3xl" textAlign="center">
          CEKI Game
        </Heading>
        <Box style={lottieBoxStyle}>
          <DotLottieReact
            src={cardGame}
            loop
            autoplay
            mode="bounce"
            style={{
              width: "100%",
              height: "100%",
              scale: "2",
            }}
          />
        </Box>
        <Stack direction="column" align="center" spacing={4} mt={6}>
          <Button size="md" colorScheme="teal" w="250px">
            Create New Game
          </Button>
          <Button size="md" colorScheme="teal" variant="outline" w="250px">
            Load Game
          </Button>
        </Stack>
      </Box>
    </MainLayout>
  );
};

export default HomePage;
