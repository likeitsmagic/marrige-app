import { Outlet } from "react-router";
import { Header } from "../Header";

export const Entry = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
