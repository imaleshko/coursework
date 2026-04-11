import { useQuery } from "@tanstack/react-query";
import { fundraisingApi } from "@/api/fundraisingApi.ts";

const useNewest = () => {
  return useQuery({
    queryKey: ["newest"],
    queryFn: fundraisingApi.get5Newest,
  });
};

export default useNewest;
