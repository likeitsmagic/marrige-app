import { useCallback, useEffect } from "react";

export const YandexAuth = () => {
    const yaButton = useCallback(async () => {
        try {
            // @ts-expect-error fix types latter
          if (window.YaAuthSuggest) {
           // eslint-disable-next-line 
          const handler = await (window as any).YaAuthSuggest.init(
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

             const result = await handler()
             console.log(result)
          }
          } catch (error) {
           console.log(error)
          }
    }, [])

    useEffect(() => {
       yaButton()
    }, [yaButton]);

    return <div id="yandex-passport-auth-container"></div>
}