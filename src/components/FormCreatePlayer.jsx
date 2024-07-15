/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Button,
  Stack,
  IconButton,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Form, Formik, FieldArray } from "formik";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getViewPortHeight } from "../utils/utils";

const FormCreatePlayer = ({ onNextPage }) => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({
    players: [
      {
        name: "",
        score: 0,
        historyScore: [0],
        id: 1,
      },
    ],
  });

  useEffect(() => {
    const savedPlayers = JSON.parse(localStorage.getItem("players"));
    if (savedPlayers && savedPlayers.length > 0) {
      setInitialValues({ players: savedPlayers });
    }
  }, []);

  const disabledAddPlayer = (values) => {
    return values.players[values.players.length - 1].name.trim() === "";
  };

  const isMaxPlayers = (values) => {
    return values.players.length >= 5;
  };

  const handleSubmit = (values) => {
    localStorage.setItem("players", JSON.stringify(values.players));
    onNextPage();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, handleChange }) => (
        <Form>
          <FieldArray name="players">
            {({ push, remove }) => (
              <>
                {values.players.map((player, index) => (
                  <FormControl key={index}>
                    <FormLabel
                      mt={2}
                      fontWeight={"semibold"}
                      fontSize={"lg"}
                    >{`Player ${index + 1}`}</FormLabel>
                    <InputGroup>
                      <Input
                        name={`players.${index}.name`}
                        onChange={handleChange}
                        value={player.name}
                        type="text"
                        placeholder={`Masukkan Nama Player ${index + 1}`}
                        border="1px"
                        borderColor="teal"
                        size={getViewPortHeight() < 770 ? "sm" : "lg"}
                      />
                      <InputRightElement width="55px" height="100%">
                        <IconButton
                          width={"100%"}
                          height={"100%"}
                          colorScheme="red"
                          onClick={() => remove(index)}
                          isDisabled={values.players.length === 1}
                          icon={<DeleteIcon />}
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                ))}
                <Button
                  w={"100%"}
                  mt={6}
                  colorScheme="teal"
                  onClick={() =>
                    push({
                      name: "",
                      score: 0,
                      historyScore: [0],
                      id: values.players.length + 1,
                    })
                  }
                  isDisabled={isMaxPlayers(values) || disabledAddPlayer(values)}
                  rightIcon={!isMaxPlayers(values) && <AddIcon />}
                >
                  {isMaxPlayers(values) ? "Already Max Player" : "Add Player"}
                </Button>
                <Stack
                  mt={16}
                  w={"100%"}
                  direction={"row"}
                  justifyContent={"space-between"}
                >
                  <Button
                    ml={-3}
                    size={"md"}
                    colorScheme="teal"
                    variant={"ghost"}
                    leftIcon={<ChevronLeftIcon mx={-2} boxSize={"1.5em"} />}
                    onClick={() => navigate("/")}
                  >
                    Home
                  </Button>
                  <Button
                    mr={-3}
                    size={"md"}
                    colorScheme="teal"
                    type="submit"
                    variant={"ghost"}
                    isDisabled={disabledAddPlayer(values)}
                    rightIcon={<ChevronRightIcon mx={-2} boxSize={"1.5em"} />}
                  >
                    Next
                  </Button>
                </Stack>
              </>
            )}
          </FieldArray>
        </Form>
      )}
    </Formik>
  );
};

export default FormCreatePlayer;
