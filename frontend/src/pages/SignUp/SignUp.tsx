import { PageConstructor } from "@gravity-ui/page-constructor";
import { FC } from "react";
import { SignUpFormV2, SignUpFormV2Name } from "src/features/SingUpFormV2";

export const SignUp: FC = () => {
	return (
		<PageConstructor
			custom={{
				blocks: {
					[SignUpFormV2Name]: SignUpFormV2,
				},
			}}
			content={{
				blocks: [{ type: SignUpFormV2Name }],
			}}
		/>
	);
};
