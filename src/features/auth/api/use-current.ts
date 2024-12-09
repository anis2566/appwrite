import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useCurrent = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await client.api.auth.current.$get();

      if (!response.ok) {
        return null;
      }
      const data = await response.json();

      return data.user;
    },
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  return query;
};
