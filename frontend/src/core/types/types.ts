export interface ILocation {
	type: "Point";
	coordinates: number[];
}

export interface IAdvantage {
	id: string;
	textRu: string;
	textEn: string;
	textFr: string;
	type: string;
}

export interface ICampaign {
	id: string;
	name: string;
	advantages: IAdvantage[];
	location: ILocation;
	phone: string;
	ownerId: string;
	createdAt: string;
	updatedAt: string;
}

export interface IUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	isConfirmed: boolean;
	authProvider: string;
	avatarUrl: string;
	permissions: string[];
	isBanned: boolean;
	banReason: string;
	createdAt: string;
	updatedAt: string;
}
