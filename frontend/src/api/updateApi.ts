import { api } from "@/api/api.ts";

export interface GetUpdateResponse {
  id: number;
  title: string;
  message: string;
  createdAt: string;
}

export const updateApi = {
  getUpdates: async (id: number): Promise<GetUpdateResponse[]> => {
    const response = await api.get<GetUpdateResponse[]>(`/updates/${id}`);
    return response.data;
  },
};
