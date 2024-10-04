import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@gravity-ui/uikit";
import { PageConstructorProvider } from "@gravity-ui/page-constructor";

import { router } from "./routes";
import { AuthContextProvider } from "./core/auth/AuthContext";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme="light">
				<PageConstructorProvider>
					<AuthContextProvider>
						<RouterProvider router={router} />
					</AuthContextProvider>
				</PageConstructorProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
};

export default App;
