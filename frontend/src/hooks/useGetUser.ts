import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/api/authApi.ts";

const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => authApi.getUser(),
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export default useGetUser;
