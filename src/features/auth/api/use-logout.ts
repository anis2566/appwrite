import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { client } from "@/lib/rpc";

export const useLogout = () => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await client.api.auth.logout.$post();
      return await response.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push("/");
        queryClient.invalidateQueries({ queryKey: ["current-user"] });
      }
    },
  });
};
