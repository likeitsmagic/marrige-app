import { Button, Flex, User } from "@gravity-ui/uikit";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";

export const ProfileHeader = () => {
	const { user } = useAuthContext();
	if (!user) {
		return null;
	}

	return (
		<Flex width="100%" justifyContent="space-between" alignItems="center">
			<User
				name={user.hasFullName ? user.fullName : user.email}
				avatar={{ text: user.email, imgUrl: user.avatarUrl }}
			/>
			<Button>{i18n.i18n("profile", "edit")}</Button>
		</Flex>
	);
};
