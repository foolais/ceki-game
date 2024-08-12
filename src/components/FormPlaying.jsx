import { useState } from "react";
import {
  Flex,
  Box,
  Tag,
  TagLeftIcon,
  TagRightIcon,
  TagLabel,
  Text,
  Button,
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  useToast,
  keyframes,
} from "@chakra-ui/react";
import { StarIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { useRef, useEffect } from "react";
import ModalEditScore from "./ModalEditScore";
import { useNavigate } from "react-router-dom";

const FormPlaying = () => {
  const { players, totalPoint } = JSON.parse(localStorage.getItem("cekiGame"));
  const colors = ["purple", "blue", "green", "yellow", "orange"];

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate();

  const [modalType, setModalType] = useState("");
  const [playersData, setPlayersData] = useState(players);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [gameWinner, setGameWinner] = useState({ status: false, name: "" });

  useEffect(() => {
    const filteredPlayer = playersData.filter(
      (player) => player.score >= totalPoint
    );
    if (filteredPlayer.length > 0) {
      setGameWinner({
        status: true,
        name: filteredPlayer[0].name,
        id: filteredPlayer[0].id,
      });
    } else {
      setGameWinner({ status: false, name: "", id: null });
    }
  }, [playersData, totalPoint]);

  const handleResetGame = () => {
    try {
      const updatedPlayers = playersData.map((player) => ({
        ...player,
        score: 0,
        historyScore: [0],
      }));

      setPlayersData(updatedPlayers);
      localStorage.setItem(
        "cekiGame",
        JSON.stringify({ players: updatedPlayers, totalPoint })
      );

      onClose();

      toast({
        title: "Success",
        description: "Game reset successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUpdatePlayer = (updatedPlayer) => {
    try {
      const updatedPlayers = playersData.map((player) => {
        if (
          player.name === updatedPlayer.name &&
          player.id === updatedPlayer.id
        ) {
          return {
            ...updatedPlayer,
            score: +updatedPlayer.score,
            historyScore: [...player.historyScore, +updatedPlayer.score],
          };
        }

        return player;
      });

      setPlayersData(updatedPlayers);
      localStorage.setItem(
        "cekiGame",
        JSON.stringify({ players: updatedPlayers, totalPoint })
      );
      toast({
        title: "Success",
        description: `${updatedPlayer.name} Score updated successfully`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleOpenModal = (type, player = {}) => {
    if (type === "editScore") {
      if (gameWinner?.status) {
        toast({
          title: "Game Has Ended",
          description: `${gameWinner?.name} is winner`,
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      setSelectedPlayer(player);
    }
    setModalType(type);
    onOpen();
  };

  const fadeInOut = keyframes`
    0% { opacity: 0; } 50% {opacity: 1; } 100% { opacity: 0; }`;

  const isWinner = (player) => {
    return (
      gameWinner?.id === player?.id &&
      gameWinner?.name === player?.name &&
      gameWinner?.status
    );
  };

  const handleViewHistory = (player) => {
    const { id } = player;
    navigate("/playing/" + id);
  };

  return (
    <Box p={4}>
      {gameWinner?.status && (
        <Text
          fontSize={"lg"}
          fontWeight={"semibold"}
          animation={`${fadeInOut} 1.25s infinite alternate`}
        >
          Ceki{" "}
          <Text as={"span"} textDecoration={"line-through"}>
            Chiken
          </Text>{" "}
          Winner is {gameWinner?.name}
        </Text>
      )}
      <Flex w={"100%"} justify={"flex-end"} mb={4}>
        <Text fontSize={"2xl"} fontWeight={"semibold"}>
          Total Point : {totalPoint}
        </Text>
      </Flex>
      <Flex direction={"column"} gap={6}>
        {playersData.map((player, index) => (
          <Flex
            key={index}
            display={"flex"}
            justify={"space-between"}
            align={"center"}
            w={"100%"}
          >
            <Tag
              size={"lg"}
              variant={"solid"}
              colorScheme={colors[index % colors.length]}
              mr={4}
              w={"full"}
              h={"50px"}
              justifyContent={"space-between"}
            >
              <Flex align={"center"} gap={1}>
                <TagLeftIcon boxSize="16px" as={StarIcon} />
                <TagLabel>{player.name}</TagLabel>
              </Flex>
              <TagRightIcon
                boxSize="20px"
                as={InfoIcon}
                _hover={{ cursor: "pointer", color: "teal.300" }}
                onClick={() => handleViewHistory(player)}
              />
            </Tag>
            <Tag
              size={"lg"}
              variant={isWinner(player) ? "solid" : "outline"}
              animation={
                isWinner(player) && `${fadeInOut} 1.25s infinite alternate`
              }
              colorScheme={player?.score < 0 ? "red" : "green"}
              _hover={{ bg: player?.score < 0 ? "red.300" : "green.300" }}
              w={"140px"}
              h={"50px"}
              cursor={"pointer"}
              justifyContent={"space-between"}
              onClick={() => handleOpenModal("editScore", player)}
            >
              <TagLabel>{player.score}</TagLabel>
              <TagRightIcon boxSize="20px" as={EditIcon} />
            </Tag>
          </Flex>
        ))}
      </Flex>
      <Button
        mt={10}
        w={"100%"}
        colorScheme="red"
        variant={"outline"}
        onClick={() => handleOpenModal("reset")}
      >
        Reset Game
      </Button>
      <AlertDialog
        isOpen={isOpen && modalType === "reset"}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset Game
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleResetGame}
                ml={3}
                _hover={{ bg: "red.300" }}
              >
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <ModalEditScore
        isOpen={isOpen && modalType === "editScore"}
        onClose={onClose}
        onConfirm={handleUpdatePlayer}
        player={selectedPlayer}
      />
    </Box>
  );
};

export default FormPlaying;
