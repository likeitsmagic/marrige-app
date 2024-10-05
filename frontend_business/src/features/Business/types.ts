import { PANELS } from "./constants";

export type Panel = (typeof PANELS)[keyof typeof PANELS];
