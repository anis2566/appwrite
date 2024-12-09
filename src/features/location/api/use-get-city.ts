import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetCity = () => {
  return useQuery({
    queryKey: ["get-city-for-select"],
    queryFn: async () => {
      const response = await client.api.location.cities.$get();
      return await response.json();
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
