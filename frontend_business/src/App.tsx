import { ThemeProvider } from "@gravity-ui/uikit";

import { Home } from "./pages/Home";

export const App = () => {
	return (
		<ThemeProvider theme="light">
			<Home />
		</ThemeProvider>
	);
};
