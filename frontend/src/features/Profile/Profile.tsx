import { Col, Divider, Row } from "@gravity-ui/uikit";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileData } from "./components/ProfileData";
import { ProfileActions } from "./components/ProfileActions";

export const Profile = () => {
	return (
		<Row space={5}>
			<Col s={12}>
				<ProfileHeader />
			</Col>
			<Col s={12}>
				<Divider />
			</Col>
			<Col s={12}>
				<ProfileData />
			</Col>
			<Col s={12}>
				<Divider />
			</Col>
			<Col s={12}>
				<ProfileActions />
			</Col>
		</Row>
	);
};

export const ProfileName = "profile-component";
