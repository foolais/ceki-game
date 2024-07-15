import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MainLayout from "../components/MainLayout";
import cardGame from "../assets/cardGame.lottie";
import { Heading, Box, Button, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <MainLayout>
      <Heading as="h1" size="3xl" textAlign="center">
        CEKI Game
      </Heading>
      <Box
        h={{ base: "250px", sm: "350px" }}
        style={{
          maxWidth: "100%",
          overflow: "hidden",
        }}
      >
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
        <Link to="/create">
          <Button size="md" colorScheme="teal" w="250px">
            Create New Game
          </Button>
        </Link>
        <Button size="md" colorScheme="teal" variant="outline" w="250px">
          Load Game
        </Button>
      </Stack>
    </MainLayout>
  );
};

export default HomePage;
