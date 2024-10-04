import { useEffect } from "react";
import { getDomain } from "src/core/helpers/getDomain";

export const YandexAuth = () => {
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
				// eslint-disable-next-line
				.then(function (result: any) {
					return result.handler();
				})
				// eslint-disable-next-line
				.then(function (data: any) {
					console.log("Сообщение с токеном: ", data);
					document.body.innerHTML += `Сообщение с токеном: ${JSON.stringify(data)}`;
				})
				// eslint-disable-next-line
				.catch(function (error: any) {
					console.log("Что-то пошло не так: ", error);
					document.body.innerHTML += `Что-то пошло не так: ${JSON.stringify(error)}`;
				});
		}
	}, []);

	return <div id="yandex-passport-auth-container"></div>;
};
