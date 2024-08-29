import { notFound } from "next/navigation";
import { getRequestConfig, getTimeZone } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale }) => {
  if (!routing.locales.includes(locale as "en" | "ru")) notFound();

  //   const timeZone = await getTimeZone();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
