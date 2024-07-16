/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  HStack,
  NumberInput,
  NumberInputField,
  Tag,
  TagLabel,
  Flex,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const ModalEditScore = (props) => {
  const { isOpen, onClose, player, onConfirm } = props;
  const [playerData, setPlayerData] = useState(null);
  const [scoreCounter, setScoreCounter] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const specialEvent = [
    {
      name: "Normal Score",
      type: "Normal",
      score: +player?.score,
    },
    {
      name: "Reset",
      type: "Reset",
      score: +player?.score,
    },
    {
      name: "Bomb",
      type: "Bomb",
      score: 25,
    },
    {
      name: "-15",
      type: "Minus",
      score: 15,
    },
    {
      name: "-10",
      type: "Minus",
      score: 10,
    },
    {
      name: "-5",
      type: "Minus",
      score: 5,
    },
    {
      name: "+5",
      type: "Plus",
      score: 5,
    },
    {
      name: "+10",
      type: "Plus",
      score: 10,
    },
    {
      name: "+15",
      type: "Plus",
      score: 15,
    },
  ];

  useEffect(() => {
    if (player) {
      setPlayerData(player);
      setTotalScore(+player?.score);
    }

    return () => {
      setPlayerData(null);
      setTotalScore(0);
      setScoreCounter(0);
    };
  }, [player]);

  useEffect(() => {
    setPlayerData((prev) => ({ ...prev, score: totalScore }));
  }, [totalScore]);

  const handleSpecialEvent = (data) => {
    switch (data.type) {
      case "Plus":
        handleChangeType(data.type);
        handleUpdateScore(+data.score);
        break;
      case "Minus":
        handleChangeType(data.type);
        handleUpdateScore(+-data.score);
        break;
      case "Reset":
        handleChangeType(player?.score >= 0 ? "Minus" : "Plus");
        setScoreCounter(
          player?.score >= 0 ? -+player?.score : Math.abs(+player?.score)
        );
        setTotalScore(0);
        break;
      case "Normal":
        setScoreCounter(0);
        setTotalScore(+player?.score);
        break;
      case "Bomb":
        setScoreCounter((prev) => prev - 25);
        setTotalScore((prev) => prev - 25);
        break;
      default:
        handleUpdateScore(data.score);
    }
  };

  const handleChangeType = (type) => {
    if (type === "Plus") setScoreCounter(Math.abs(scoreCounter));
  };

  const handleUpdateScore = (value) => {
    const newScore = scoreCounter + +value;
    setScoreCounter(newScore);
    setTotalScore((prev) => prev + +value);
  };

  const handleChangeScore = (value) => {
    setScoreCounter(+value);
    setTotalScore((prev) => prev + +value);
  };

  const handleSave = () => {
    onConfirm(playerData);
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit score player {playerData?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Special Event</FormLabel>
              <Flex wrap={"wrap"} grow={3} gap={4} mb={4}>
                {specialEvent.map((data) => (
                  <Tag
                    key={data.name}
                    w={"max-content"}
                    size={"lg"}
                    variant={"solid"}
                    colorScheme={
                      data.type === "Plus" || data.type === "Normal"
                        ? "green"
                        : "red"
                    }
                    cursor={"pointer"}
                    onClick={() => handleSpecialEvent(data)}
                  >
                    <TagLabel>{data.name}</TagLabel>
                  </Tag>
                ))}
              </Flex>
              <FormLabel>Counter Score</FormLabel>
              <HStack>
                <Button colorScheme="red" onClick={() => handleUpdateScore(-1)}>
                  -
                </Button>
                <NumberInput
                  maxW={"150px"}
                  value={scoreCounter}
                  onChange={(value) => handleChangeScore(value)}
                >
                  <NumberInputField />
                </NumberInput>
                <Button
                  onClick={() => handleUpdateScore(1)}
                  colorScheme="green"
                >
                  +
                </Button>
              </HStack>
              <Flex mt={4} gap={4} alignItems={"end"}>
                <Box>
                  <FormLabel>Original Score</FormLabel>
                  <NumberInput maxW={"150px"} value={player?.score} isReadOnly>
                    <NumberInputField />
                  </NumberInput>
                </Box>
                <IconButton
                  isRound={true}
                  colorScheme="teal"
                  icon={<ArrowForwardIcon />}
                />
                <Box>
                  <FormLabel>Total Score</FormLabel>
                  <NumberInput maxW={"150px"} value={totalScore} isReadOnly>
                    <NumberInputField />
                  </NumberInput>
                </Box>
              </Flex>
            </FormControl>
          </ModalBody>
          <ModalFooter mt={8}>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditScore;
