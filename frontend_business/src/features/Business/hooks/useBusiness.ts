import { useContext } from "react";

import { BusinessContext } from "./BusinessContext";

export const useBusiness = () => useContext(BusinessContext);
