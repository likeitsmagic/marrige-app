import { TActivitySector } from "../activitySector";

export type TCampaign = {
  id: string;
  ownerId: string;
  name: string;
  phone: string;
  region: string;
  activitySector: TActivitySector;
  rating: number;
  createdAt: string;
  updatedAt: string;
};
