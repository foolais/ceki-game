import { Flex, Tag, TagLeftIcon, TagLabel } from "@chakra-ui/react";
import { MoonIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <Flex pos={"absolute"} top={0} right={0} left={0} p={4}>
      <Link to="/">
        <Tag size="lg" variant={"solid"} colorScheme={"teal"} mr={4}>
          <TagLeftIcon boxSize="12px" as={MoonIcon} />
          <TagLabel>CekIGm</TagLabel>
        </Tag>
      </Link>
    </Flex>
  );
};

export default Navbar;
