import { Button, Flex, Spin, User } from "@gravity-ui/uikit";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";

export const UserProfile = () => {
	const navigate = useNavigate();

	const { user, isAuthenticated, isLoading } = useAuthContext();

	const handleClick = () => {
		navigate("/signin");
	};

	if (isLoading) {
		return (
			<Flex alignItems="center" height="100%">
				<Spin />
			</Flex>
		);
	}

	if (!isAuthenticated || !user) {
		return (
			<Flex alignItems="center" height="100%">
				<Button view="outlined-utility" size="xl" onClick={handleClick}>
					{i18n.i18n("header", "login")}
				</Button>
			</Flex>
		);
	}

	return (
		<Flex alignItems="center" height="100%">
			<User name={user.email} description={user.id} />
		</Flex>
	);
};

export const UserProfileName = "user-profile";
