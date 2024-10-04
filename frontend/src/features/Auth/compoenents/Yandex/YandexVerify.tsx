import { Flex, Spin } from "@gravity-ui/uikit";
import { useEffect } from "react";

export const YandexVerify = () => {
	useEffect(() => {
        // @ts-expect-error fix later
        if (window.YaSendSuggestToken) {
			// @ts-expect-error fix later
			window.YaSendSuggestToken(`${getDomain()}/signin/`);
		}
        window.close()
	}, []);
	return <Flex justifyContent="center" alignItems="center" height="100vh" width="100%">
        <Spin />
    </Flex>;
};
