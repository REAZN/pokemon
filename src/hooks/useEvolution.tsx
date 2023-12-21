import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Evolution } from "@/types/evolution";

export const useEvolution = (evolution: string) => {
  return useQuery({
    queryKey: ["evolution", evolution],
    queryFn: async () => {
      return (await axios.get<Evolution>(evolution)).data; //TODO type
    },
    enabled: !!evolution,
    staleTime: Infinity,
  });
};
