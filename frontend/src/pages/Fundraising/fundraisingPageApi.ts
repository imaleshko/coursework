import { api } from "../../app/api.ts";

export interface GetUpdateResponse {
  id: number;
  title: string;
  message: string;
  createdAt: string;
}

export interface GetDonationResponse {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
  message: string | null;
}

export const fundraisingPageApi = {
  getUpdates: async (id: number): Promise<GetUpdateResponse[]> => {
    const response = await api.get<GetUpdateResponse[]>(
      `/fundraising/${id}/updates`,
    );
    return response.data;
  },

  getSuccessfulDonations: async (
    fundraisingId: number,
  ): Promise<GetDonationResponse[]> => {
    const response = await api.get<GetDonationResponse[]>(
      `/fundraising/${fundraisingId}/donations`,
    );
    return response.data;
  },
};
