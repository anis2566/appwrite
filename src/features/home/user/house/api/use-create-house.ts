import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { CREATE_HOUSE_ACTION } from "../server/action";

export const useCreateHouse = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: CREATE_HOUSE_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success, {
          duration: 5000,
        });
        router.push("/user/house");
      }

      if (data.error) {
        toast.error(data.error, {
          duration: 5000,
        });
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      });
    },
  });
};
