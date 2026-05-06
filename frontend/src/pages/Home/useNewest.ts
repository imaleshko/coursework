import { useQuery } from "@tanstack/react-query";
import { fundraisersApi } from "@/api/fundraisersApi.ts";

const useNewest = () => {
  return useQuery({
    queryKey: ["newest"],
    queryFn: fundraisersApi.getNewest,
  });
};

export default useNewest;
