import { FC } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";

import { Entry } from "./features/Aplication/Entry";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Business } from "./pages/Business";

export interface FeatureRoute {
	component: FC;
	path: string;
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Entry />,
		children: [
			{path: "/", element: <Navigate to="/my-business" />},
			{path: "/my-business", element: <Business />}
		]
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
