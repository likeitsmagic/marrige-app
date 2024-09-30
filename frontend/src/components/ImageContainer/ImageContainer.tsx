import { FC, PropsWithChildren } from "react";

export const ImageContainer: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div
			className="bg-cover relative max-w-screen-2xl"
		>
			<div className="w-full h-[720px] relative z-10">{children}</div>
		</div>
	);
};
