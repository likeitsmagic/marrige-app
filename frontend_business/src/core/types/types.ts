export interface ILocation {
	type: "Point";
	coordinates: number[];
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
