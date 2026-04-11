import { api } from "@/api/api.ts";

interface FundraisingCard {
  id: number;
  title: string;
  author: string;
  balance: number;
  goal: number;
  slug: string;
}

export const fundraisingApi = {
  get5Newest: async (): Promise<FundraisingCard[]> => {
    const response = await api.get<FundraisingCard[]>("/fundraising/newest");
    return response.data;
  },
};
