import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Species } from "@/types/species";

export const useSpecies = (species: string) => {
  return useQuery({
    queryKey: ["species", species],
    queryFn: async () => {
      return (await axios.get<Species>(species)).data;
    },
    enabled: !!species,
    staleTime: Infinity,
  });
};
