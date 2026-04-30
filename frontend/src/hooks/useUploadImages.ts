import { useMutation } from "@tanstack/react-query";
import { imageApi } from "@/api/imageApi.ts";
import { isAxiosError } from "axios";

export const useUploadImages = () => {
  const mutation = useMutation({
    mutationFn: (files: File[]) => imageApi.uploadImages(files),
  });

  const getErrorMessage = (): string | null => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return (
        mutation.error.response?.data?.detail ||
        "Помилка завантаження зображень"
      );
    }
    return mutation.error.message || "Невідома помилка";
  };

  return {
    uploadImages: mutation.mutateAsync,
    isUploading: mutation.isPending,
    error: getErrorMessage(),
  };
};
