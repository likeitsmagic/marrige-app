import { Button } from "@nextui-org/react";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "src/core/auth/useAuth";

export const Profile = () => {
	const navigate = useNavigate();
	const { logout } = useAuthContext();

	const handleLogout = useCallback(() => {
		logout();
		navigate("/");
	}, [logout, navigate]);

	return (
		<div>
			<h1>Profile</h1>
			<Button onClick={handleLogout}>Logout</Button>
		</div>
	);
};
