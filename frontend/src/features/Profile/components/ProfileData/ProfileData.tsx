import { Col, Row } from "@gravity-ui/uikit";
import { FC } from "react";
import { FormInput } from "src/components/RegionSelect/FormInput";
import { useAuthContext } from "src/core/auth/useAuth";
import i18n from "src/i18n";

interface ProfileDataProps {
	inEdit?: boolean;
}

export const ProfileData: FC<ProfileDataProps> = ({ inEdit = false }) => {
    const { user } = useAuthContext();

    if (!user) {
        return null;
    }

	return <Row space={5}>
       <Col s={12}>
       <Row space={5}>
       <Col s={12} m={4}>
            <FormInput label={i18n.i18n("profile", "email")} value={user.email} inEdit={inEdit} />
            </Col>
            <Col s={12} m={4}>
            <FormInput label={i18n.i18n("profile", "is_confirmed")} value={user.isConfirmed ? i18n.i18n("common", "yes") : i18n.i18n("common", "no")} inEdit={inEdit} />
            </Col>
       </Row>
       </Col>
       <Col s={12}>
       <Row space={5}>
       <Col s={12} m={4}>
            <FormInput label={i18n.i18n("profile", "auth_provider")} value={user.authProvider} inEdit={inEdit} />
            </Col>
            <Col s={12} m={4}>
            <FormInput label={i18n.i18n("profile", "is_password_set")} value={user.isPasswordSet ? i18n.i18n("common", "yes") : i18n.i18n("common", "no")} inEdit={inEdit} />
            </Col>
       </Row>
       </Col>
       <Col s={12}>
       <Row space={5}>
       <Col s={12} m={4}>
            <FormInput label={i18n.i18n("profile", "full_name")} value={user.hasFullName ? user.fullName : "-"} inEdit={inEdit} />
            </Col>
       </Row>
       </Col>
            </Row>
};
