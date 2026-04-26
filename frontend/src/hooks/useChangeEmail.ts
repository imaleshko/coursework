import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { accountApi, type ChangeEmailRequest } from "@/api/accountApi.ts";

const useChangeEmail = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: ChangeEmailRequest) => accountApi.changeEmail(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["user"], updatedUser);
    },
  });

  const getErrorMessage = (): string | null => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return mutation.error.response?.data?.detail || "Помилка зміни пошти";
    }
    return mutation.error.message || "Невідома помилка";
  };

  return {
    changeEmail: mutation.mutate,
    isPending: mutation.isPending,
    error: getErrorMessage(),
  };
};

export default useChangeEmail;
