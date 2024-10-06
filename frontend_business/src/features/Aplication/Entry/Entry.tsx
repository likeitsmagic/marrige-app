import { ChartAreaStacked, Comment, House } from "@gravity-ui/icons";
import { PageLayout, PageLayoutAside } from "@gravity-ui/navigation";
import { Flex, Spin, Text } from "@gravity-ui/uikit";
import React, { useCallback } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";
import { Footer } from "src/features/Footer";

import logoIcon from "../../../assets/logo.svg";

export const Entry = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const { isAuthenticated, isLoading } = useAuthContext();

	const renderFooter = useCallback(() => {
		return <Footer />;
	}, []);

	if (isLoading) {
		return (
			<Flex
				height="100vh"
				width="100%"
				alignItems="center"
				justifyContent="center"
			>
				<Spin />
			</Flex>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/signin" />;
	}

	return (
		<PageLayout compact={false}>
			<React.Fragment>
				<style>
					{`.g-root {
                --gn-aside-header-decoration-expanded-background-color: rgb(255,255,255);
                --gn-aside-header-divider-vertical-color: rgb(200,200,200);
                --gn-aside-header-divider-horizontal-color: rgb(150,150,150);
                --gn-aside-header-background-color: rgba(255,92,92, 0.7);
                --gn-aside-header-item-background-color-hover: rgba(255,255,255,0.5);
                --gn-aside-header-general-item-icon-color: rgb(255,255,255);
                --gn-aside-header-item-icon-color: var(--g-color-text-primary);
                --gn-aside-header-item-current-background-color: rgb(255,255,255);
                --gn-aside-header-item-current-background-color-hover: rgba(255,255,255,0.8);
                --gn-aside-header-item-current-icon-color: rgb(255,92,92);
                --gn-aside-header-item-current-text-color: rgb(255,92,92);
            }`}
				</style>
				<PageLayoutAside
					headerDecoration
					logo={{
						text: () => (
							<Text variant="header-1">
								{i18n.i18n("application", "title")}
							</Text>
						),
						iconSrc: logoIcon,
						iconSize: 42,
						wrapper: (node) => (
							<Flex alignItems="center" justifyContent="center">
								{node}
							</Flex>
						),
						onClick: () => navigate("/"),
					}}
					menuItems={[
						{
							id: "my-company",
							title: (
								<Text variant="body-2">
									{i18n.i18n("application", "pages_my_business")}
								</Text>
							),
							icon: House,
							onItemClick: () => navigate("/my-business"),
							current: pathname === "/my-business",
						},
						{
							id: "messages",
							title: (
								<Text variant="body-2">
									{i18n.i18n("application", "pages_messages")}
								</Text>
							),
							icon: Comment,
							onItemClick: () => navigate("/messages"),
							current: pathname === "/messages",
						},
						{
							id: "statistics",
							title: (
								<Text variant="body-2">
									{i18n.i18n("application", "pages_statistics")}
								</Text>
							),
							icon: ChartAreaStacked,
							onItemClick: () => navigate("/statistics"),
							current: pathname === "/statistics",
						},
					]}
					renderFooter={renderFooter}
					hideCollapseButton
				/>
			</React.Fragment>

			<PageLayout.Content>
				<Outlet />
			</PageLayout.Content>
		</PageLayout>
	);
};
