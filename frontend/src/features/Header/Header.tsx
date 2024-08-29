"use client"

import { Link, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { NavbarMenuButton } from "./components/NavbarMenuButton";
import { Link as NextLink } from "@/routing";

export const Header = () => {
    const t = useTranslations("Header")

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return <Navbar maxWidth="2xl" height="6rem" isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className="md:hidden" justify="start">
            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarContent className="md:hidden pr-3" justify="center">
            <NavbarBrand>
                <h1 className="font-bold text-inherit">{t("brand")}</h1>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex" justify="start">
            <NavbarBrand>
                <h1 className="font-bold text-inherit text-2xl">{t("brand")}</h1>
            </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-0" justify="center">
            <NavbarMenuButton title={t("wedding")} items={["1", "2", "3"]} />

            <NavbarMenuButton title={t("reception_venues")} items={["1", "2", "3"]} />

            <NavbarMenuButton title={t("vendors")} items={["1", "2", "3"]} />

            <NavbarMenuButton title={t("couple")} items={["1", "2", "3"]} />
        </NavbarContent>

        <NavbarContent justify="end">
            <NavbarItem>
                <Link href="/signin-signup" as={NextLink} color="primary" className="uppercase">{t("signin_signup")}</Link>
            </NavbarItem>
        </NavbarContent>

        <NavbarMenu>

        </NavbarMenu>
    </Navbar>
}