import type { EvolutionChain } from "@/types/evolution";
import { usePokemon } from "@/hooks/usePokemon";
import Image from "next/image";

export const PokemonEvolution = ({ evolution }: { evolution: EvolutionChain }) => {
  const { data: pokemon } = usePokemon(evolution?.species.name);
  return (
    <div key={evolution?.species.name} className="flex items-center gap-2 justify-center">
      {evolution?.evolution_details[0]?.min_level && (
        <p className="truncate bg-elements rounded-full p-1.5 px-2 text-xs text-gray-500 font-bold">
          Lvl {evolution?.evolution_details[0]?.min_level}
        </p>
      )}

      <Image
        className=""
        src={
          pokemon?.sprites.other?.home.front_default ??
          pokemon?.sprites.other?.["official-artwork"].front_default ??
          "/assets/fallback.svg"
        }
        alt={pokemon?.name ?? "pokemon"}
        width={60}
        height={60}
      />
      {evolution?.evolves_to.length > 0 && (
        <div className="ml-2 flex flex-col items-center">
          {evolution?.evolves_to.map((childEvolution, index) => (
            <PokemonEvolution key={index} evolution={childEvolution} />
          ))}
        </div>
      )}
    </div>
  );
};
