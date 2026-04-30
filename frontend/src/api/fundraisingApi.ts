import { api } from "@/api/api.ts";

interface FundraisingCard {
  id: number;
  title: string;
  author: string;
  balance: number;
  goal: number;
  slug: string;
}

export interface CreateFundraisingRequest {
  title: string;
  slug: string;
  description: string;
  goal?: number;
  endDate?: string;
  imagesUrl?: string[];
}

export const fundraisingApi = {
  get5Newest: async (): Promise<FundraisingCard[]> => {
    const response = await api.get<FundraisingCard[]>("/fundraising/newest");
    return response.data;
  },

  createFundraising: async (data: CreateFundraisingRequest): Promise<void> => {
    await api.post<void>("/fundraising/create", data);
  },
};
