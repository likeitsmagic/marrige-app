import { ThemeProvider } from "@gravity-ui/uikit";

import { RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./core/auth/AuthContext";
import { router } from "./routes";

export const App = () => {
	return (
		<ThemeProvider theme="light">
			<AuthContextProvider>
						<RouterProvider router={router} />
					</AuthContextProvider>
		</ThemeProvider>
	);
};
