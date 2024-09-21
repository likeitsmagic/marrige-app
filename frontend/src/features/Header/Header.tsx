import {
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle,
} from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { NavbarMenuButton } from "./components/NavbarMenuButton";
import { UserInfo } from "./components/UserInfo";

export const Header = () => {
	const { t } = useTranslation("translation", { keyPrefix: "Header" });

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<Navbar
			maxWidth="2xl"
			height="6rem"
			isMenuOpen={isMenuOpen}
			onMenuOpenChange={setIsMenuOpen}
		>
			<NavbarContent className="md:hidden" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				/>
			</NavbarContent>

			<NavbarContent className="md:hidden pr-3" justify="center">
				<NavbarBrand>
					<RouterLink to="/">
						<h1 className="font-bold text-inherit">{t("brand")}</h1>
					</RouterLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden md:flex" justify="start">
				<NavbarBrand>
					<RouterLink to="/">
						<h1 className="font-bold text-inherit text-2xl">{t("brand")}</h1>
					</RouterLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent className="hidden md:flex gap-0" justify="center">
				<NavbarMenuButton title={t("wedding")} items={["1", "2", "3"]} />

				<NavbarMenuButton
					title={t("reception_venues")}
					items={["1", "2", "3"]}
				/>

				<NavbarMenuButton title={t("vendors")} items={["1", "2", "3"]} />

				<NavbarMenuButton title={t("couple")} items={["1", "2", "3"]} />
			</NavbarContent>

			<NavbarContent justify="end">
				<NavbarItem>
					<UserInfo />
				</NavbarItem>
			</NavbarContent>

			<NavbarMenu></NavbarMenu>
		</Navbar>
	);
};
