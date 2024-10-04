import { PageConstructor } from "@gravity-ui/page-constructor";
import { FC } from "react";
import { Footer, FooterName } from "src/features/Footer";
import { SingInFormV2, SingInFormV2Name } from "src/features/SingInFormV2";

export const SignIn: FC = () => {
	return (
		<PageConstructor
			custom={{
				blocks: {
					[SingInFormV2Name]: SingInFormV2,
					[FooterName]: Footer,
				},
			}}
			content={{
				blocks: [{ type: SingInFormV2Name }, { type: FooterName }],
			}}
		/>
	);
};
