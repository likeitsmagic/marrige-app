import { FC } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "../pages/router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { withTranslation,  } from 'react-i18next';

import "./localization/i18n.ts";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default withTranslation()(App)