import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp/SignUp";
import { Profile } from "./pages/Profile";
import { ProtectedEntry } from "./features/Application";
import { YandexVerify } from "./features/Auth/compoenents/Yandex/YandexVerify";

export interface FeatureRoute {
	component: FC;
	path: string;
}

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/signin",
		element: <SignIn />,
	},
	{
		path: "/signup",
		element: <SignUp />,
	},
	{
		path: "/profile",
		element: (
			<ProtectedEntry>
				<Profile />
			</ProtectedEntry>
		),
	},
	{
		path: "/verify_yid",
		element: <YandexVerify />,
	},
]);
