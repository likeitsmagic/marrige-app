import { PageConstructor } from "@gravity-ui/page-constructor";
import { FC } from "react";
import { SingInFormV2, SingInFormV2Name } from "src/features/SingInFormV2";

export const SignIn: FC = () => {
	return (
		<PageConstructor
			custom={{
				blocks: {
					[SingInFormV2Name]: SingInFormV2,
				},
			}}
			content={{
				blocks: [{ type: SingInFormV2Name }],
			}}
		/>
	);
};
