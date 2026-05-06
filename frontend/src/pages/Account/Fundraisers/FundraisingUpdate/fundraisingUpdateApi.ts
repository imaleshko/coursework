import { api } from "../../../../app/api.ts";

export interface CreateUpdateRequest {
  title: string;
  message: string;
}

export const fundraisingUpdateApi = {
  create: async (
    fundraisingId: number,
    data: CreateUpdateRequest,
  ): Promise<void> => {
    await api.post(`/fundraising/${fundraisingId}/updates`, data);
  },
};
