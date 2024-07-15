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
} from "@chakra-ui/react";
import { StarIcon, EditIcon } from "@chakra-ui/icons";
import { useRef } from "react";
import ModalEditScore from "./ModalEditScore";

const FormPlaying = () => {
  const { players, totalPoint } = JSON.parse(localStorage.getItem("cekiGame"));
  const colors = ["purple", "blue", "green", "yellow", "orange"];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [modalType, setModalType] = useState("");
  const [playersData, setPlayersData] = useState(players);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleResetGame = () => {
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
  };

  const handleUpdatePlayer = (updatedPlayer) => {
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
  };

  const handleOpenModal = (type, player = {}) => {
    if (type === "editScore") setSelectedPlayer(player);
    setModalType(type);
    onOpen();
  };

  return (
    <Box p={4}>
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
            >
              <TagLeftIcon boxSize="12px" as={StarIcon} />
              <TagLabel>{player.name}</TagLabel>
            </Tag>
            <Tag
              size={"lg"}
              variant={"outline"}
              colorScheme={"teal"}
              _hover={{ bg: "teal.300" }}
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
