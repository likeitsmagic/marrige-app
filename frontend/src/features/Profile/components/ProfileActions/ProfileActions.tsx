import { Button, Card, Container, Flex, Text } from "@gravity-ui/uikit";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";

export const ProfileActions = () => {
	const navigate = useNavigate();
	const { logout } = useAuthContext();

	const handleLogout = useCallback(() => {
		logout();
		navigate("/");
	}, [logout, navigate]);

	return (
		<Card theme="normal" view="filled">
			<Container style={{ padding: "16px" }}>
				<Flex justifyContent="space-between">
					<Text variant="subheader-2" color="primary">
						{i18n.i18n("profile", "actions")}{" "}
					</Text>
					<Flex gap={2}>
						<Button view="outlined">
							{i18n.i18n("profile", "change_password")}
						</Button>
						<Button onClick={handleLogout} view="outlined-utility">
							{i18n.i18n("profile", "logout")}
						</Button>
					</Flex>
				</Flex>
			</Container>
		</Card>
	);
};
