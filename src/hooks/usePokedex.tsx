import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import type { Pokedex } from "@/types/pokedex";

export const usePokedex = ({ search, limit = 20 }: { search: string; limit?: number }) => {
  return useInfiniteQuery({
    queryKey: ["pokedex", search, limit],
    queryFn: async ({ pageParam = 0 }) => {
      const pokedex = (await axios.get<Pokedex>("https://pokeapi.co/api/v2/pokemon?limit=9999")).data;

      const filteredResults = pokedex.results.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase()),
      );
      const paginatedResults = filteredResults.slice(pageParam * limit, (pageParam + 1) * limit);

      return {
        results: paginatedResults,
        nextPage: (pageParam + 1) * limit < filteredResults.length ? pageParam + 1 : undefined,
        prevPage: pageParam > 0 ? pageParam - 1 : undefined,
      };
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
    getPreviousPageParam: (lastPage) => lastPage.prevPage,
    initialPageParam: 0,
  });
};
