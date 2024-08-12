/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { ChevronLeftIcon } from "@chakra-ui/icons";
import MainLayout from "../components/MainLayout";
import ChartHistory from "../components/ChartHistory";
import { Heading, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlayerHistoryHeader = ({ name }) => {
  return (
    <Heading as={"h2"} size="lg" textAlign={"center"} mb={6}>
      History Player {name}
    </Heading>
  );
};

const PlayerHistory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [player, setPlayer] = useState({
    name: "",
    score: 0,
    historyScore: [0],
    id: 0,
  });

  const isPlayingCeki = JSON.parse(localStorage.getItem("isPlayingCeki"));

  useEffect(() => {
    const cekiGame = JSON.parse(localStorage.getItem("cekiGame"));

    if (!cekiGame || !cekiGame?.players || !isPlayingCeki) {
      navigate("/");
      return;
    }

    const { players } = cekiGame;
    const selectedPlayer = players.find((player) => player.id === +id);

    if (selectedPlayer) setPlayer(selectedPlayer);
    else navigate("/playing");

    return () => {
      setPlayer({
        name: "",
        score: 0,
        historyScore: [0],
        id: 0,
      });
    };
  }, [id, isPlayingCeki]);

  return (
    <MainLayout>
      <PlayerHistoryHeader name={player?.name} />
      <ChartHistory player={player} />
      <Button
        w={"100%"}
        mt={6}
        colorScheme="teal"
        onClick={() => navigate("/playing")}
      >
        <ChevronLeftIcon boxSize={8} _hover={{ cursor: "pointer" }} />
        Back to playing Ceki
      </Button>
    </MainLayout>
  );
};

export default PlayerHistory;
