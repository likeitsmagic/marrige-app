import { ThemeProvider } from "@gravity-ui/uikit";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthContextProvider } from "./core/auth/AuthContext";
import { router } from "./routes";

const queryClient = new QueryClient()

export const App = () => {
	return (
		<ThemeProvider theme="light">
			  <QueryClientProvider client={queryClient}>
			<AuthContextProvider>
				<RouterProvider router={router} />
			</AuthContextProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
};
