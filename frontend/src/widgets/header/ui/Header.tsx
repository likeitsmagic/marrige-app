import { Heading, HStack, Link } from "@chakra-ui/react";
import { t } from "i18next";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../../app/auth/useAuth.ts";

export const Header: FC = () => {
  const { logout, isAuthenticated } = useAuth();
  return (
    <HStack p="4" spacing="4">
      <Heading mr="2" size="lg">
        {t("header")}
      </Heading>
      <Link as={RouterLink} to="/">
        {t("main_page")}
      </Link>
      {!isAuthenticated() && (
        <>
          <Link as={RouterLink} to="/signin">
            {t("signin")}
          </Link>
          <Link as={RouterLink} to="/signup">
            {t("signup")}
          </Link>
        </>
      )}

      {isAuthenticated() && (
        <Link onClick={logout}>{t("logout")}</Link>
      )}
    </HStack>
  )
};
