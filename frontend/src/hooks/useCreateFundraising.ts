import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  type CreateFundraisingRequest,
  fundraisersApi,
} from "../api/fundraisersApi.ts";
import { isAxiosError } from "axios";
import { imageApi } from "@/api/imageApi.ts";

interface CreateFundraisingFormData {
  title: string;
  slug: string;
  description: string;
  goal?: number;
  endDate?: string;
  images: File[];
}

export const useCreateFundraising = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateFundraisingFormData) => {
      let imageUrls: string[] = [];

      if (data.images.length > 0) {
        imageUrls = await imageApi.uploadImages(data.images);
      }

      const requestData: CreateFundraisingRequest = {
        title: data.title,
        slug: data.slug,
        description: data.description,
        goal: data.goal,
        endDate: data.endDate,
        imagesUrl: imageUrls,
      };

      return fundraisersApi.createFundraising(requestData);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["fundraisings"] });
    },
  });

  const getErrorMessage = (): string | null => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return mutation.error.response?.data?.detail || "Помилка створення збору";
    }
    return mutation.error.message || "Невідома помилка";
  };

  return {
    createFundraising: mutation.mutate,
    isPending: mutation.isPending,
    error: getErrorMessage(),
  };
};
