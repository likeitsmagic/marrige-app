import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Link,
	Skeleton,
	User,
} from "@nextui-org/react";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "src/core/auth/useAuth";

export const UserInfo: FC = () => {
	const navigate = useNavigate();
	const { t } = useTranslation("translation", { keyPrefix: "Header" });

	const { user, isAuthenticated, isLoading, logout } = useAuthContext();

	const isBusiness = user?.permissions?.includes("business");

	const handleLogout = useCallback(() => {
		logout();
		navigate("/");
	}, [logout, navigate]);

	const handleOpenMyCampaign = useCallback(() => {
		navigate("/campaign/1");
	}, [navigate]);

	if (isLoading) {
		return <Skeleton className="h-3 w-3/5 rounded-lg" />;
	}

	if (!isAuthenticated || !user) {
		return (
			<Link to="/signin" as={RouterLink} color="primary" className="uppercase">
				{t("signin_signup")}
			</Link>
		);
	}

	return (
		<Dropdown>
			<DropdownTrigger>
				<User name={user.email} description={isBusiness ? t("business") : ""} />
			</DropdownTrigger>
			<DropdownMenu
				className="w-[340px]"
				itemClasses={{
					base: "gap-4",
				}}
			>
				<DropdownItem>
					<RouterLink to={`/user/${user.id}`}>{t("profile")}</RouterLink>
				</DropdownItem>

				<DropdownItem
					className={isBusiness ? "visible" : "hidden"}
					onClick={handleOpenMyCampaign}
				>
					{t("my_campaign")}
				</DropdownItem>

				<DropdownItem onClick={handleLogout}>{t("logout")}</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
