import { NextUIProvider } from "@nextui-org/react";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { router } from "./routes";
import { AuthContextProvider } from "./core/auth/AuthContext";

const queryClient = new QueryClient();

const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<NextUIProvider>
				<AuthContextProvider>
					<RouterProvider router={router} />
				</AuthContextProvider>
			</NextUIProvider>
		</QueryClientProvider>
	);
};

export default App;
