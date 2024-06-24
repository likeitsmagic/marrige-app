import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Header } from "../../widgets/header/ui/Header.tsx";
import { Outlet } from "react-router-dom";

export const RootPage: FC = () => (
  <Box>
    <Header />
    <Outlet />
  </Box>
);
