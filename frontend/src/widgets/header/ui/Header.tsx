import { HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FC } from "react";

export const Header: FC = () => (
  <HStack p="4" spacing="4">
    <Link as={RouterLink} to="/">
      Home
    </Link>
    <Link as={RouterLink} to="/signin">
      SignIn
    </Link>
    <Link as={RouterLink} to="/signup">
      SignUp
    </Link>
  </HStack>
);
