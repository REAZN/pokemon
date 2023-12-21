import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Type } from "@/types/type";

export const useType = (type: string) => {
  return useQuery({
    queryKey: ["type", type],
    queryFn: async () => {
      return (await axios.get<Type>(type)).data;
    },
    enabled: !!type,
    staleTime: Infinity,
  });
};
