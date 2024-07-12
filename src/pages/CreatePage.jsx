import MainLayout from "../components/MainLayout";
import { Heading } from "@chakra-ui/react";
import FormCreatePlayer from "../components/FormCreatePlayer";
import { useState } from "react";

const CreatePage = () => {
  const [type, setType] = useState("player");

  return (
    <MainLayout>
      {/* how to add if by type here */}
      {type === "player" ? (
        <>
          <Heading as={"h2"} size="2xl" mb={8} textAlign="center">
            Set Player
          </Heading>
          <FormCreatePlayer onNextPage={() => setType("score")} />
        </>
      ) : (
        type === "score" && (
          <Heading as={"h2"} size="2xl" mb={8} textAlign="center">
            Set Total Score
          </Heading>
        )
      )}
    </MainLayout>
  );
};

export default CreatePage;
