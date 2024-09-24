import { FC } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Entry } from "./features/Application";
import { Home } from "./pages/Home";
import { SignInForm } from "./features/SignInForm";
import { Profile } from "./pages/Profile";
import { ProtectedEntry } from "./features/Application/ProtectedEntry";
import { SignUpForm } from "./features/SignUpForm";
import { Campaign } from "./pages/Campaign";
import { CreateCampaign } from "./pages/CreateCampaign";

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
				path: "/signup",
				element: <SignUpForm />,
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
				path: "/campaign/:id",
				element: (
					<ProtectedEntry>
						<Campaign />
					</ProtectedEntry>
				),
			},
			{
				path: "/create-campaign",
				element: (
					<ProtectedEntry>
						<CreateCampaign />
					</ProtectedEntry>
				),
			},
		],
	},
]);
