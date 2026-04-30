import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type CreateFundraisingRequest, fundraisingApi } from "@/api/fundraisingApi.ts";
import { isAxiosError } from "axios";

export const useCreateFundraising = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CreateFundraisingRequest) =>
      fundraisingApi.createFundraising(data),
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
    createFundraising: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: getErrorMessage(),
  };
};
