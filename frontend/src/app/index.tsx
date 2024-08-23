import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "../pages/router.tsx";
import { withTranslation, } from 'react-i18next';

import "./localization/i18n.ts";
import theme from "./ui/config.ts";

const App: FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default withTranslation()(App)