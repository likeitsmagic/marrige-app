import { FC } from "react";

export const Brand: FC = () => {
	return (
		<div className="flex items-center gap-2 font-goudy">
			<h1 className="text-4xl text-black">Toi</h1>
			<h1 className="text-4xl text-primary">&</h1>
			<h1 className="text-4xl text-white">Moi</h1>
		</div>
	);
};
