import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Skeleton,
	User,
} from "@nextui-org/react";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { IoPersonSharp } from "react-icons/io5";
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

	const handleOpenSignInSignUp = useCallback(() => {
		navigate("/signin");
	}, [navigate]);

	if (isLoading) {
		return <Skeleton className="h-3 w-3/5 rounded-lg" />;
	}

	if (!isAuthenticated || !user) {
		return (
			<div
				className="text-primary flex items-center justify-center gap-4 border-2 border-white rounded-full p-4 group cursor-pointer w-16 h-16 hover:w-[280px] transition-width duration-300 ease-in-out overflow-hidden will-change-[width,opacity]"
				onClick={handleOpenSignInSignUp}
			>
				<div>
					<IoPersonSharp size="36px" />
				</div>
				<div className="hidden group-hover:block overflow-hidden">
					<p className="text-xl">{t("signin_signup")}</p>
				</div>
			</div>
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
