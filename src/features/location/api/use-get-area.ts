import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetArea = (cityId: string) => {
  return useQuery({
    queryKey: ["get-area-for-select", cityId],
    queryFn: async () => {
      const response = await client.api.location.area[":cityId"].$get({param:{cityId}})
      return await response.json();
    },
    enabled: !!cityId
  });
};
