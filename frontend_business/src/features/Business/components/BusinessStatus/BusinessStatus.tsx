import { Label } from "@gravity-ui/uikit";

import { FC } from "react";
import i18n from "src/i18n";

interface BusinessStatusProps {
    isReady: boolean;
}

export const BusinessStatus: FC<BusinessStatusProps> = ({ isReady }) => {
    if (isReady) {
        return <Label theme="utility">{i18n.i18n("business", "is_ready")}</Label>
    }

    return <Label>{i18n.i18n("business", "draft")}</Label>
}