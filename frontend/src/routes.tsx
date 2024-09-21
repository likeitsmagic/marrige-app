import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Entry } from "./features/Application";
import { Home } from "./features/Home";
import { SignInForm } from "./features/SignInForm";
import { Profile } from "./features/Profile/Profile";
import { ProtectedEntry } from "./features/Application/ProtectedEntry";
import { SignUpForm } from "./features/SignUpForm";

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
			{
				path: "/signin",
				element: <SignInForm />,
			},
			{
				path: "/user/:id",
				element: (
					<ProtectedEntry>
						<Profile />
					</ProtectedEntry>
				),
			},
			{
				path: "/signup",
				element: <SignUpForm />,
			},
		],
	},
]);
