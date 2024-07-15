import FormPlaying from "../components/FormPlaying";
import MainLayout from "../components/MainLayout";
import { Heading } from "@chakra-ui/react";

const PlayingPage = () => {
  return (
    <MainLayout>
      <Heading as="h2" size="2xl" mb={6} textAlign="center">
        On Playing CEKI
      </Heading>
      <FormPlaying />
    </MainLayout>
  );
};

export default PlayingPage;
