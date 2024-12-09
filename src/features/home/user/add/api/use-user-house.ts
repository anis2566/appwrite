import { useQuery } from "@tanstack/react-query";

import { GET_HOUSES_BY_USER } from "../server/action";

export const useUserHouses = () => {
  return useQuery({
    queryKey: ["user-houses"],
    queryFn: async () => {
      const houses = await GET_HOUSES_BY_USER();
      return houses;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });
};
