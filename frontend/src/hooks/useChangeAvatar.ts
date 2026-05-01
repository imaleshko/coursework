import { useMutation, useQueryClient } from "@tanstack/react-query";
import { imageApi } from "@/api/imageApi.ts";
import { accountApi, type User } from "@/api/accountApi.ts";
import { isAxiosError } from "axios";

const useChangeAvatar = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (file: File) => {
      const url = await imageApi.uploadImages([file]);
      if (!url || url.length === 0) {
        throw new Error("Не вдалося отримати URL зображення");
      }

      return accountApi.changeAvatar({ avatarUrl: url[0] });
    },

    onSuccess: (updatedUser: User) => {
      queryClient.setQueryData(["user"], updatedUser);
    },
  });

  const getErrorMessage = (): string | null => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return (
        mutation.error.response?.data?.detail || "Помилка оновлення аватарки"
      );
    }
    return mutation.error.message || "Невідома помилка";
  };

  return {
    changeAvatar: mutation.mutate,
    isPending: mutation.isPending,
    error: getErrorMessage(),
  };
};

export default useChangeAvatar;
