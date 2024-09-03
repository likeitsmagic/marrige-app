import { Link, Skeleton, User } from "@nextui-org/react";
import { FC } from "react";
import { useAuthContext } from "src/core/auth/useAuth";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

export const UserInfo: FC = () => {
    const { t } = useTranslation("translation", { keyPrefix: "Header" })

    const { user, isAuthenticated, isLoading } = useAuthContext();

    const isBusiness = user?.permissions?.includes("business");


    if (isLoading) {
        return <Skeleton className="h-3 w-3/5 rounded-lg" />;
    }

    if (!isAuthenticated || !user) {
        return <Link to="/signin" as={RouterLink} color="primary" className="uppercase">{t("signin_signup")}</Link>;
    }

    return <RouterLink to={`/user/${user.id}`}>
        <User name={user.email} description={isBusiness ? "Business" : "Individual"} />
    </RouterLink>

}