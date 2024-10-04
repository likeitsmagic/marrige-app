import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAuthContext } from "src/core/auth/useAuth";

export const ProtectedEntry: FC<PropsWithChildren> = ({ children }) => {
	const { isAuthenticated, isLoading } = useAuthContext();

	if (isLoading) {
		return (
			<div className="w-full h-full flex justify-center items-center"></div>
		);
	}

	if (!isAuthenticated) {
		return <Navigate to="/signin" />;
	}

	return <>{children}</>;
};
