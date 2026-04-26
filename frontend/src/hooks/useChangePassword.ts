import { useMutation } from "@tanstack/react-query";
import { accountApi, type ChangePasswordRequest } from "@/api/accountApi.ts";
import { isAxiosError } from "axios";

const useChangePassword = () => {
  const mutation = useMutation({
    mutationFn: (data: ChangePasswordRequest) =>
      accountApi.changePassword(data),
  });

  const getErrorMessage = (): string | null => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return mutation.error.response?.data?.detail || "Помилка зміни пароля";
    }
    return mutation.error.message || "Невідома помилка";
  };

  return {
    changePassword: mutation.mutate,
    isPending: mutation.isPending,
    error: getErrorMessage(),
  };
};

export default useChangePassword;
