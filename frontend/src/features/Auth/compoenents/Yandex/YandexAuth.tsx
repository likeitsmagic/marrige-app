import { useEffect } from "react";

export const YandexAuth = () => {
    useEffect(() => {
        // @ts-expect-error fix types latter
       if (window.YaAuthSuggest) {
        // eslint-disable-next-line 
        (window as any).YaAuthSuggest.init(
            {
              client_id: "c20e0af991c84269be34f885db675513",
              response_type: "token",
              redirect_uri: "https://moyasvadba.space/verify_yid"
            },
            "https://moyasvadba.space",
            {
              view: "button",
              parentId: "yandex-passport-auth-container",
              buttonSize: 'xs',
              buttonView: 'main',
              buttonTheme: 'light',
              buttonBorderRadius: "8",
              buttonIcon: 'ya',
            }
          )
          .then(({handler}: {handler: () => unknown}) => handler())
          .then((data: unknown) => console.log('Сообщение с токеном', data))
          .catch((error: unknown) => console.log('Обработка ошибки', error))
       }

    }, []);

    return <div id="yandex-passport-auth-container"></div>
}