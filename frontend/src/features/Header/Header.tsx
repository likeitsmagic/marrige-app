import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { GoArrowLeft } from "react-icons/go";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Brand } from "./components/Brand";
import { UserInfo } from "./components/UserInfo";

export const Header = () => {
	const { t } = useTranslation("translation", { keyPrefix: "Header" });

	const { pathname } = useLocation();
	const navigate = useNavigate();

	const isSignInSignUp = pathname === "/signin" || pathname === "/signup";

	const handleGoBack = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	return (
		<Navbar
			maxWidth="2xl"
			height="6rem"
			classNames={{
				base: "bg-transparent",
			}}
		>
			<NavbarBrand className={isSignInSignUp ? "hidden" : "block"}>
				<RouterLink to="/">
					<Brand />
				</RouterLink>
			</NavbarBrand>

			<div className={`${isSignInSignUp ? "grid" : "hidden"} w-full grid-cols-[1fr_auto_1fr]`}>
				<div>
					<Button
						className="text-primary text-2xl"
						variant="light"
						startContent={<GoArrowLeft />}
						onClick={handleGoBack}
					>
						{t("back")}
					</Button>
				</div>
				<div>
					<Brand />
				</div>
			</div>

			<NavbarContent justify="end" className={isSignInSignUp ? "hidden" : "flex"}>
				<NavbarItem>
					<UserInfo />
				</NavbarItem>
			</NavbarContent>
		</Navbar>
	);
};
