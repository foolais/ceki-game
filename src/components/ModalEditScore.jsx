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
  Input,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useState } from "react";

const ModalEditScore = (props) => {
  const { isOpen, onClose, player, onConfirm } = props;
  const [playerData, setPlayerData] = useState();

  useEffect(() => {
    setPlayerData(player);
  }, [player]);

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
          <ModalHeader>Edit Score</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Score</FormLabel>
              <HStack>
                <Button onClick={() => handleChangeScore(-1)}>-</Button>
                <Input
                  value={playerData?.score}
                  onChange={(e) =>
                    setPlayerData({ ...playerData, score: e.target.value })
                  }
                />
                <Button onClick={() => handleChangeScore(1)}>+</Button>
              </HStack>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalEditScore;
