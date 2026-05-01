import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { accountApi, type ChangeUsernameRequest } from "@/api/accountApi.ts";

const useChangeUsername = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ChangeUsernameRequest) =>
      accountApi.changeUsername(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user"], updatedUser);
    },
  });

  const getErrorMessage = (): string | null => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return mutation.error.response?.data?.detail || "Помилка зміни імені";
    }
    return mutation.error.message || "Невідома помилка";
  };

  return {
    changeUsername: mutation.mutate,
    isPending: mutation.isPending,
    error: getErrorMessage(),
  };
};

export default useChangeUsername;
