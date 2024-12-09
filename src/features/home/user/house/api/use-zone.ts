import { useQuery } from "@tanstack/react-query";

import { GET_ZONE_BY_CITY_ID } from "../server/action";

interface UseZoneByCityIdProps {
  city_id: number | undefined;
}

export const useZonesByCityId = ({ city_id }: UseZoneByCityIdProps) => {
  return useQuery({
    queryKey: ["zones", city_id],
    queryFn: async () => {
      const response = await GET_ZONE_BY_CITY_ID(city_id);
      return response;
    },
  });
};
