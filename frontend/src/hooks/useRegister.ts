import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { authApi, type RegisterRequest } from "@/api/authApi.ts";
import { isAxiosError } from "axios";
import { setAccessToken } from "@/api/api.ts";

const useRegister = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
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
        mutation.error.response?.data?.detail || "Помилка реєстрації",
      );
    }
    return mutation.error;
  };

  return {
    register: mutation.mutate,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: getErrorMessage(),
  };
};

export default useRegister;
