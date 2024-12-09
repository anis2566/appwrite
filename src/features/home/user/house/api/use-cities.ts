import { useQuery } from "@tanstack/react-query";

import { GET_CITIES } from "../server/action";

export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await GET_CITIES();
      return response;
    },
    staleTime: Infinity,
  });
};
