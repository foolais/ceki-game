/* eslint-disable react/prop-types */
import { Field, Form, Formik } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  NumberInput,
  NumberInputField,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
} from "@chakra-ui/react";
import { ChevronLeftIcon, BellIcon } from "@chakra-ui/icons";
import { useState, useEffect } from "react";

const FormSetPoint = ({ onPreviousPage }) => {
  const [totalPoint, setTotalPoint] = useState({ point: 0 });

  useEffect(() => {
    const savedPoints = JSON.parse(localStorage.getItem("point"));
    if (savedPoints) {
      setTotalPoint({ point: savedPoints });
    }
  }, []);

  const validatePoint = (value) => {
    let error;
    if (!+value || +value <= 0) {
      error = "Required";
    } else if (+value < 25) {
      error = "Minimum 25 Point";
    }
    return error;
  };

  const handleClickTag = (props, value) => {
    if (props.values.point !== value) setTotalPoint({ point: value });
  };

  const handleSubmit = (values, actions) => {
    const { point } = values;
    localStorage.setItem("point", point);
    actions.setSubmitting(false);
  };

  return (
    <Formik
      key={totalPoint}
      initialValues={totalPoint}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {(props) => (
        <Form>
          <Field name="point" validate={validatePoint}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.point && form.touched.point}>
                <FormLabel>Total Point</FormLabel>
                <NumberInput
                  defaultValue={0}
                  value={totalPoint.point}
                  onChange={(value) => setTotalPoint({ point: value })}
                >
                  <NumberInputField {...field} />
                </NumberInput>
                <FormErrorMessage>{form.errors.point}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <HStack justifyContent="center" spacing={6} mt={4}>
            {[50, 75, 100, 150].map((data) => (
              <Tag
                size="md"
                key={data}
                variant={props.values.point == data ? "solid" : "outline"}
                colorScheme="teal"
                cursor={props.values.point == data ? "default" : "pointer"}
                _hover={{ bg: "teal", color: "white" }}
                onClick={() => handleClickTag(props, data)}
              >
                <TagLeftIcon boxSize="12px" as={BellIcon} />
                <TagLabel>{data}</TagLabel>
              </Tag>
            ))}
          </HStack>
          <Button
            w={"full"}
            mt={6}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Create Game
          </Button>
          <Button
            mt={20}
            colorScheme="teal"
            variant="ghost"
            leftIcon={<ChevronLeftIcon />}
            onClick={onPreviousPage}
          >
            Previous
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormSetPoint;
