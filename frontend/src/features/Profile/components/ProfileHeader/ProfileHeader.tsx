import { Button, Flex, User } from "@gravity-ui/uikit";
import { useAuthContext } from "src/core/auth/useAuth";

export const ProfileHeader = () => {
    const {user} = useAuthContext()
    if (!user) {
        return null;
    }

	return <Flex width="100%" justifyContent="space-between">
        <User name={user.email} description={user.id} avatar={{text: user.email}} />
        <Button>Edit profile</Button>
    </Flex>;
};

export const ProfileHeaderName = "profile-header"
