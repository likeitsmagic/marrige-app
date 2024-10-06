import { SmartCaptcha } from "@yandex/smart-captcha";
import { FC, useCallback } from "react";

interface CaptchaProps {
	setToken: (token: string) => void;
}

export const Captcha: FC<CaptchaProps> = ({ setToken }) => {
	const siteKey = process.env.REACT_APP_YANDEX_CAPTCHA_KEY;

	const handleSuccess = useCallback(
		(token: string) => {
			setToken(token);
		},
		[setToken],
	);

	if (!siteKey) {
		console.warn("yandex captcha disabled");
		return null;
	}

	return <SmartCaptcha sitekey={siteKey} onSuccess={handleSuccess} />;
};
