import { Outlet } from "react-router";
import { Header } from "../Header";
import bgUrl from "src/assets/bg.webp";
export const Entry = () => {
	return (
		<div
			className="bg-cover bg-center relative max-w-screen-2xl mx-auto xl:bg-top"
			style={{ backgroundImage: `url(${bgUrl})` }}
		>
			<Header />
			<Outlet />
		</div>
	);
};
