import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios from "axios";
import { Pokemon } from "@/types/pokemon";

export const usePokemon = (overridePokemon?: string | number) => {
  const { pokemon } = useParams();

  return useQuery({
    queryKey: ["pokemon", pokemon || overridePokemon],
    queryFn: async () => {
      return (await axios.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemon || overridePokemon}`)).data;
    },
    placeholderData: (prev) => prev,
    enabled: !!pokemon || !!overridePokemon,
    staleTime: Infinity,
  });
};
