import { useEffect } from "react";

export const VkAuth = () => {
    const vkidScript = `
  <script src="https://unpkg.com/@vkid/sdk@<3.0.0/dist-sdk/umd/index.js"></script>
  <script type="text/javascript">
    if ('VKIDSDK' in window) {
      const VKID = window.VKIDSDK;

      VKID.Config.init({
        app: 52014508,
        redirectUrl: 'https://moyasvadba.space/veryfy_vkid',
        responseMode: VKID.ConfigResponseMode.Callback,
        source: VKID.ConfigSource.LOWCODE,
      });

      const oneTap = new VKID.OneTap();

      oneTap.render({
        container: document.currentScript.parentElement,
        showAlternativeLogin: true,
        styles: {
          height: 36
        }
      })
      .on(VKID.WidgetEvents.ERROR, vkidOnError)
      .on(VKID.OneTapInternalEvents.LOGIN_SUCCESS, function (payload) {
        const code = payload.code;
        const deviceId = payload.device_id;

        VKID.Auth.exchangeCode(code, deviceId)
          .then(vkidOnSuccess)
          .catch(vkidOnError);
      });
    }
    
    function vkidOnSuccess(data) {
      // Обработка полученного результата
    }
  
    function vkidOnError(error) {
      // Обработка ошибки
    }
  </script>`

          useEffect(() => {
            const container = document.getElementById('vkid-container')
            if (container && container.children.length === 0) {
                container.innerHTML = vkidScript
            }
          }, [vkidScript]);

    return (
        <div id="vkid-container">
            
        </div>
    );
};
