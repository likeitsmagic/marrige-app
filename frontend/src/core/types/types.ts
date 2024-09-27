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
