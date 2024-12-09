import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { CREATE_FLAT_ACTION } from "../server/action";

export const useCreateFlat = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: CREATE_FLAT_ACTION,
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error, {
          duration: 5000,
        });
      }

      if (data.success) {
        toast.success(data.success, {
          duration: 5000,
        });
        router.push("/user/flat");
      }
    },
    onError: (error) => {
      toast.error(error.message, {
        duration: 5000,
      });
    },
  });
};
