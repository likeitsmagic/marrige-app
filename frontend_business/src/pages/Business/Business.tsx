import { BusinessContextProvider } from "src/features/Business/hooks/BusinessContext";

import { Business as BusinessComponent } from "../../features/Business";

export const Business = () => {
	return (
		<BusinessContextProvider>
			<BusinessComponent />
		</BusinessContextProvider>
	);
};
