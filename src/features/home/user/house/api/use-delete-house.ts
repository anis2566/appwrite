import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { DELETE_HOUSE_ACTION } from "../server/action";

interface UseDeleteHouseProps {
  onClose: () => void;
}

export const useDeleteHouse = ({ onClose }: UseDeleteHouseProps) => {
  const mutation = useMutation({
    mutationFn: DELETE_HOUSE_ACTION,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.success, {
          duration: 5000,
        });
        onClose();
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

  return mutation;
};
