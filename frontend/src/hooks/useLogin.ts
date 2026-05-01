import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi, type LoginRequest } from "@/api/authApi.ts";
import { isAxiosError } from "axios";
import { setAccessToken } from "@/api/api.ts";
import { useNavigate } from "react-router";

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: async (response) => {
      if (response?.accessToken) {
        setAccessToken(response.accessToken);
      }

      void queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      navigate("/account/profile");
    },
  });

  const getErrorMessage = (): string | null => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return mutation.error.response?.data?.detail || "Помилка входу";
    }
    return mutation.error.message || "Невідома помилка";
  };

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: getErrorMessage(),
  };
};

export default useLogin;
