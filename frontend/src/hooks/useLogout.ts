import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/authApi.ts";
import { setAccessToken } from "@/api/api.ts";
import { queryClient } from "@/api/queryClient.ts";

const useLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSettled: () => {
      setAccessToken(null);
      queryClient.removeQueries({ queryKey: ["user"] });
      navigate("/");
    },
  });
};

export default useLogout;
