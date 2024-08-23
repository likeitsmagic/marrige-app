import { Box, HStack, Image, Link } from "@chakra-ui/react";
import { t } from "i18next";
import { FC } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../../app/auth/useAuth.ts";

export const Header: FC = () => {
  const { logout, isAuthenticated } = useAuth();
  return (
    <HStack p="6" justifyContent="space-between" alignItems="center">
      <Box>
        <Image src="/logo.webp" alt="logo" width="100px" height="60px" />
      </Box>
      <HStack gap={10}>
        <Link as={RouterLink} to="/" textTransform="uppercase">
          {t("wedding")}
        </Link>
        <Link as={RouterLink} to="/reception_venues" textTransform="uppercase">
          {t("reception_venues")}
        </Link>
        <Link as={RouterLink} to="/vendors" textTransform="uppercase">
          {t("vendors")}
        </Link>
        <Link as={RouterLink} to="/couple" textTransform="uppercase">
          {t("couple")}
        </Link>
      </HStack>
      <HStack>
        {!isAuthenticated() && (
          <>
            <Link as={RouterLink} to="/signin-or-signup" color="brand.500" textTransform="uppercase">
              {t("signin_signup")}
            </Link>
          </>
        )}

        {isAuthenticated() && (
          <Link onClick={logout} textTransform="uppercase">{t("logout")}</Link>
        )}
      </HStack>
    </HStack>
  )
};