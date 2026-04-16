import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { authApi, type LoginRequest } from "@/api/authApi.ts";
import { isAxiosError } from "axios";
import { setAccessToken } from "@/api/api.ts";

const useLogin = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      if (response?.accessToken) {
        setAccessToken(response.accessToken);
      }
      navigate("/account");
    },
  });

  const getErrorMessage = () => {
    if (!mutation.error) return null;
    if (isAxiosError(mutation.error)) {
      return new Error(
        mutation.error.response?.data?.message || "Помилка входу",
      );
    }
    return mutation.error;
  };

  return {
    login: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: getErrorMessage(),
  };
};

export default useLogin;
