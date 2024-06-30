import { Button, HStack, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FC } from "react";
import { useAuth } from "../../../app/auth/useAuth.ts";

export const Header: FC = () => {
  const {logout} = useAuth();
  return (
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
      <Button onClick={logout}>Logout</Button>
    </HStack>
  )
};
