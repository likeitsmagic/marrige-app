import { Flex, Spin } from "@gravity-ui/uikit";
import { useEffect } from "react";
import { getDomain } from "src/core/helpers/getDomain";

export const YandexVerify = () => {
	useEffect(() => {
		// @ts-expect-error fix later
		if (window.YaSendSuggestToken) {
			// @ts-expect-error fix later
			window.YaSendSuggestToken(`${getDomain()}`);
		}
	}, []);
	return (
		<Flex
			justifyContent="center"
			alignItems="center"
			height="100vh"
			width="100%"
		>
			<Spin />
		</Flex>
	);
};
