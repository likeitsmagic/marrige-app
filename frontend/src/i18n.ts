import { I18N } from "@gravity-ui/i18n";

import en from "./keysets/en.json";
import ru from "./keysets/ru.json";

const i18n = new I18N();
i18n.registerKeysets("en", en);
i18n.registerKeysets("ru", ru);

i18n.setFallbackLang("ru");

export default i18n;
