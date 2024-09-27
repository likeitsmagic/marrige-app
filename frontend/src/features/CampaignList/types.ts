export type TAdvantage = {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
};

export type TActivitySector = {
	id: string;
	name: string;
	advantages: TAdvantage[];
	createdAt: string;
	updatedAt: string;
};

export type TCampaign = {
	id: string;
	ownerId: string;
	name: string;
	phone: string;
	region: string;
	activitySector: TActivitySector;
	rating: number;
	images: string[];
	createdAt: string;
	updatedAt: string;
};
