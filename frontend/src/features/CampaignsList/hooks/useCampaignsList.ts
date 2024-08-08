import { useCallback, useEffect, useState } from "react";
import axiosInstance from "../../../app/api/axios";
import { TCampaign } from "../../../shared/models/campaign";
import { useBoolean } from "@chakra-ui/react";

export const useCampaignsList = () => {
  const [campaigns, setCampaigns] = useState<TCampaign[]>([]);
  const [loading, setLoading] = useBoolean(false);

  const getCampaigns = useCallback(async () => {
    try {
      setLoading.on();
      const { data } = await axiosInstance.get<TCampaign[]>("/campaigns");
      setCampaigns(data);
    } catch (error) {
      setCampaigns([]);
    } finally {
      setLoading.off();
    }
  }, [setLoading]);

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  return { campaigns, loading };
};
