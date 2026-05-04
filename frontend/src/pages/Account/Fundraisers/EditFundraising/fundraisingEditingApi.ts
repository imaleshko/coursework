import { api } from "@/api/api.ts";

export interface EditFundraisingResponse {
  id: number;
  title: string;
  slug: string;
  description: string;
  goal: number | null;
  endDate: string | null;
  existingImagesUrls: string[];
}

export interface UpdateFundraisingRequest {
  title: string;
  slug: string;
  description: string;
  goal?: number;
  endDate?: string;
  imagesUrl: string[];
}

export const fundraisingEditingApi = {
  getForEdit: async (slug: string): Promise<EditFundraisingResponse> => {
    const response = await api.get<EditFundraisingResponse>(
      `/fundraising/edit/${slug}`,
    );
    return response.data;
  },

  update: async (
    currentSlug: string,
    data: UpdateFundraisingRequest,
  ): Promise<void> => {
    await api.put(`/fundraising/edit/${currentSlug}`, data);
  },
};
