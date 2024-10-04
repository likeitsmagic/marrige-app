import { FC } from "react";
import { Footer as GFooter } from "@gravity-ui/navigation";

export const Footer: FC = () => {
	return (
		<GFooter
			className="page-footer"
			copyright={`@ ${new Date().getFullYear()} "Toi & Moi"`}
			view="clear"
			withDivider
		/>
	);
};
