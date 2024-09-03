import { Services, ServiceKey } from "./constants";

const domain =
  import.meta.env.VITE_NODE_ENV === "development"
    ? "localhost:81"
    : window.location.hostname;

export const getApiUrl = (
  service: (typeof Services)[ServiceKey],
  path?: string
): string => {
  const protocol = window.location.protocol;

  return `${protocol}//${service}.${domain}/${path}`;
};
