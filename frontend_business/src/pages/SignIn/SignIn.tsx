import { Flex } from "@gravity-ui/uikit";
import { SignInForm } from "src/features/SignInForm";

export const SignIn = () => {
	return (
		<Flex
			height="100vh"
			width="100%"
			alignItems="center"
			justifyContent="center"
		>
			<SignInForm />
		</Flex>
	);
};
