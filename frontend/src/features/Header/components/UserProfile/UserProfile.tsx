import { Button, Flex, Spin, User } from "@gravity-ui/uikit";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
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
			<Link to="/profile" style={{ textDecoration: "none" }}>
				<User
					name={user.hasFullName ? user.fullName : user.email}
					avatar={{ text: user.email, imgUrl: user.avatarUrl }}
				/>
			</Link>
		</Flex>
	);
};

export const UserProfileName = "user-profile";
