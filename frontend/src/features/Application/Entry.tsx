import { Outlet } from "react-router";
import { FC } from "react";

import { Footer } from "../Footer";

export const Entry: FC = () => {
	return (
		<>
			<Outlet />
			<Footer />
		</>
	);
};
