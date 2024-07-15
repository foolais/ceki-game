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
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon, EditIcon } from "@chakra-ui/icons";
import { useRef } from "react";

const FormPlaying = () => {
  const { players, totalPoint } = JSON.parse(localStorage.getItem("cekiGame"));
  const colors = ["purple", "blue", "green", "yellow", "orange"];

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const [playersData, setPlayersData] = useState(players);

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
              mr={4}
              w={"140px"}
              h={"50px"}
              justifyContent={"space-between"}
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
        onClick={onOpen}
      >
        Reset Game
      </Button>
      <AlertDialog
        isOpen={isOpen}
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
    </Box>
  );
};

export default FormPlaying;
