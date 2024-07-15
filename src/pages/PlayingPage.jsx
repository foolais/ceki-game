import MainLayout from "../components/MainLayout";
import { Heading } from "@chakra-ui/react";

const PlayingPage = () => {
  return (
    <MainLayout>
      <Heading as="h2" size="2xl" mb={8} textAlign="center">
        Playing Page
      </Heading>
    </MainLayout>
  );
};

export default PlayingPage;
