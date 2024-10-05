import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";

import { Entry } from "./features/Aplication/Entry";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";

export interface FeatureRoute {
	component: FC;
	path: string;
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Entry />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
		],
	},
	{
		path: "/signin",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
]);
