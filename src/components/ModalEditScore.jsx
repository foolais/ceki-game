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
  TagLeftIcon,
  TagLabel,
  Flex,
} from "@chakra-ui/react";
import { MinusIcon, AddIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const ModalEditScore = (props) => {
  const { isOpen, onClose, player, onConfirm } = props;
  const [playerData, setPlayerData] = useState();
  const [type, setType] = useState("Minus");

  const specialEvent = [
    {
      name: "Normal Score",
      type: "Normal",
      score: +player?.score,
    },
    {
      name: "Reset",
      type: "Reset",
      score: 0,
    },
    {
      name: "Bomb",
      type: "Minus",
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
    setPlayerData(player);
  }, [player]);

  const handleSpecialEvent = (data) => {
    console.log({ data });
    handleChangeType(data.type);
    if (data.type === "Plus") {
      handleChangeScore(data.score);
    } else if (data.type === "Minus") {
      handleChangeScore(-data.score);
    } else if (data.type === "Reset") {
      setPlayerData({ ...playerData, score: 0 });
    } else if (data.type === "Normal") {
      setPlayerData({ ...playerData, score: data?.score });
    } else {
      handleChangeScore(data.score);
    }
  };

  const handleChangeType = (value) => {
    setType(value);
  };

  const handleChangeScore = (value) => {
    const newScore = +playerData?.score + value;
    setPlayerData({ ...playerData, score: newScore });
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
              <FormLabel>Tipe</FormLabel>
              <HStack mb={4}>
                {["Minus", "Plus"].map((data) => (
                  <Tag
                    key={data}
                    size={"lg"}
                    variant={type === data ? "solid" : "outline"}
                    colorScheme={data === "Plus" ? "green" : "red"}
                    cursor={"pointer"}
                    onClick={() => handleChangeType(data)}
                  >
                    <TagLeftIcon
                      boxSize="12px"
                      as={data === "Plus" ? AddIcon : MinusIcon}
                    />
                    <TagLabel>{data}</TagLabel>
                  </Tag>
                ))}
              </HStack>
              <FormLabel>Score</FormLabel>
              <HStack>
                <Button
                  colorScheme="red"
                  isDisabled={+playerData?.score <= 0}
                  onClick={() => handleChangeScore(-1)}
                >
                  -
                </Button>
                <NumberInput
                  maxW={"150px"}
                  value={playerData?.score}
                  onChange={(e) =>
                    setPlayerData({ ...playerData, score: e.target.value })
                  }
                >
                  <NumberInputField />
                </NumberInput>
                <Button
                  onClick={() => handleChangeScore(1)}
                  colorScheme="green"
                >
                  +
                </Button>
              </HStack>
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
