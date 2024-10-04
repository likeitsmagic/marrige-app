import { FC, useCallback, useEffect } from "react";
import { getDomain } from "src/core/helpers/getDomain";
import { YandexOAuthResponse } from "./types";
import { useAuthContext } from "src/core/auth/useAuth";
import { useNavigate } from "react-router";


export const YandexAuth: FC = () => {
    const navigate = useNavigate();

    const { signInOAuth } = useAuthContext();

    const handleSuccess = useCallback(async  (data: YandexOAuthResponse) => {
        const res = await signInOAuth(data.access_token);
        if (res.authenticated) {
            navigate("/");
            return;
        } 
        const container = document.getElementById("yandex-passport-auth-container");
        if (container) {
            container.innerHTML = res.error ?? "";
        }
    }, [signInOAuth, navigate])


	useEffect(() => {
		// @ts-expect-error fix types latter
		if (window.YaAuthSuggest) {
			// eslint-disable-next-line
			(window as any).YaAuthSuggest.init(
				{
					client_id: "c20e0af991c84269be34f885db675513",
					response_type: "token",
					redirect_uri: `${getDomain()}/verify_yid`,
				},
				`${getDomain()}/`,
				{
					view: "button",
					parentId: "yandex-passport-auth-container",
					buttonSize: "xs",
					buttonView: "main",
					buttonTheme: "light",
					buttonBorderRadius: "8",
					buttonIcon: "ya",
				},
			)
				.then(({handler}: {handler: () => void}) => handler())
				.then(handleSuccess)
				// eslint-disable-next-line
				.catch(function (error: any) {
					// TODO: handle error
				});
		}
	}, [handleSuccess]);

	return <div id="yandex-passport-auth-container"></div>;
};
