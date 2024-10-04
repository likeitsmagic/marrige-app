import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import "@diplodoc/transform/dist/css/yfm.min.css";
import "./index.scss";

import "./i18n";
import App from "./App";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
