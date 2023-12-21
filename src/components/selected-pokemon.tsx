"use client";

import Image from "next/image";
import { usePokemon } from "@/hooks/usePokemon";
import { cn, elementType, stats } from "@/lib/utils";
import { EyeOffIcon } from "lucide-react";
import { TypeBadge } from "@/components/type-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useSpecies } from "@/hooks/useSpecies";
import { useEvolution } from "@/hooks/useEvolution";
import { PokemonNavigation } from "@/components/selected-navigation";
import { PokemonEvolution } from "@/components/selected-evolution";
import { PokemonWeakness } from "@/components/selected-weakness";
import { Tooltip } from "@/components/ui/tooltip";

export const SelectedPokemon = ({
  selected,
  handle,
  className,
}: {
  selected: string | number;
  handle?: boolean;
  className?: string;
}) => {
  const { data: pokemon, isLoading } = usePokemon(selected);
  const { data: species, isLoading: speciesIsLoading } = useSpecies(pokemon?.species.url ?? "");
  const { data: evolution, isLoading: evolutionIsLoading } = useEvolution(species?.evolution_chain.url ?? "");

  return (
    <div
      className={cn(
        "relative w-[25rem] h-[calc(100vh-4rem)] bg-foreground rounded-3xl shadow-poke overflow-hidden",
        className,
        handle && "rounded-b-none cursor-grab",
      )}
    >
      {/*Top image/background*/}
      <div className="relative w-full h-64 pointer-events-none">
        {handle && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full w-24 h-1.5 z-40 bg-white/70" />
        )}
        <div
          className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[calc(175%)] aspect-square rounded-full"
          style={{
            background: `linear-gradient(130deg, ${
              pokemon?.types[0].type.name ? elementType[pokemon.types[0].type.name] : "#fcfcfc"
            } 60%, rgba(255,255,255,1) 100%)`,
          }}
        />
        <Image
          className="absolute left-1/2 top-[40%] -translate-y-1/2 -translate-x-1/2"
          style={{ maskImage: "linear-gradient(130deg, rgba(0,0,0,.6), rgba(0,0,0,0))" }}
          src={`./assets/elements/${pokemon?.types[0].type.name ?? "normal"}.svg`}
          alt="Element Type"
          width={150}
          height={150}
        />
        <Image
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          src={
            pokemon?.sprites.other?.home.front_default ??
            pokemon?.sprites.other?.["official-artwork"].front_default ??
            "/assets/fallback.svg"
          }
          alt={pokemon?.name ?? "pokemon"}
          width={225}
          height={225}
        />
      </div>

      {/*Content*/}
      <div className="relative flex flex-col items-center gap-4 p-8 pt-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden h-[calc(100%-24rem)]">
        {/*Number*/}
        {isLoading ? (
          <Skeleton className="w-12 h-4" />
        ) : (
          <span className="font-medium capitalize text-zinc-500 text-sm -mb-4">
            Nº{pokemon?.id.toString().padStart(3, "0")}
          </span>
        )}

        {/*Name*/}
        {isLoading ? (
          <Skeleton className="w-64 h-6" />
        ) : (
          <h2 className="font-black capitalize text-2xl">{pokemon?.name}</h2>
        )}

        {/*Element types*/}
        <div className="flex gap-2">
          {isLoading && (
            <>
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
            </>
          )}
          {pokemon?.types.map((type, index) => (
            <TypeBadge key={index} type={type.type.name}>
              {type.type.name}
            </TypeBadge>
          ))}
        </div>

        {/*Pokédex Entry*/}
        <div className="w-full flex flex-col gap-2 items-center">
          <h2 className="font-black text-sm text-center">POKÉDEX ENTRY</h2>
          {speciesIsLoading ? (
            <>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </>
          ) : (
            <p className="text-center text-sm">
              {species?.flavor_text_entries
                .find((entry) => entry.language.name === "en")
                ?.flavor_text.replaceAll("\f", " ")}
            </p>
          )}
        </div>

        {/*Abilities*/}
        <div className="w-full flex flex-col gap-2 font-bold">
          <h2 className="font-black text-sm text-center">ABILITIES</h2>
          <div className="grid grid-cols-2 w-full gap-2">
            {isLoading && (
              <>
                <Skeleton className="h-10 rounded-full" />
                <Skeleton className="h-10 rounded-full" />
              </>
            )}
            {pokemon?.abilities.map((ability, index) =>
              ability.is_hidden ? (
                <Tooltip content="Hidden" key={index}>
                  <div className="flex items-center justify-center gap-2 rounded-full bg-elements py-1.5 text-center w-full capitalize ring-1 ring-red-300">
                    <span>{ability.ability.name}</span>
                    <EyeOffIcon className="w-6 h-6 text-gray-400" />
                  </div>
                </Tooltip>
              ) : (
                <div
                  key={index}
                  className="rounded-full bg-elements py-1.5 text-center w-full capitalize ring-1 ring-blue-200"
                >
                  <span>{ability.ability.name}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/*Basic stats*/}
        <div className="flex w-full gap-2 font-bold">
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-black text-sm">HEIGHT</h2>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-full" />
            ) : (
              <div className="rounded-full bg-elements py-2 text-center w-full">
                {pokemon?.height ? `${pokemon?.height / 10}m` : "??"}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-black text-sm">WEIGHT</h2>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-full" />
            ) : (
              <div className="rounded-full bg-elements py-2 text-center w-full">
                {pokemon?.weight ? `${pokemon?.weight / 10}kg` : "??"}
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full gap-2 font-bold">
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-black text-sm">WEAKNESS</h2>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-full" />
            ) : (
              <div className="rounded-full bg-elements p-2 flex gap-1 items-center justify-center w-full">
                <PokemonWeakness type={pokemon?.types[0].type.url ?? ""} />
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-black text-sm">BASE EXP</h2>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-full" />
            ) : (
              <div className="rounded-full bg-elements py-2 text-center w-full">{pokemon?.base_experience ?? "??"}</div>
            )}
          </div>
        </div>

        {/*Stats*/}
        <div className="w-full">
          <h2 className="font-black text-sm text-center">STATS</h2>
          <div className="flex justify-between">
            {isLoading ? (
              Array(7)
                .fill("")
                .map((_, index) => <Skeleton key={index} className="h-16 w-10 rounded-full" />)
            ) : (
              <>
                {pokemon?.stats.map((stat, index) => (
                  <Tooltip key={index} content={stat.stat.name}>
                    <div className="flex flex-col items-center rounded-full bg-elements p-1 gap-1">
                      <div
                        className="rounded-full aspect-square p-1 min-w-8 flex items-center justify-center text-xs font-black text-white"
                        style={{ backgroundColor: stats[stat.stat.name].color }}
                      >
                        {stats[stat.stat.name].acronym}
                      </div>
                      <span className="font-black text-sm pb-1.5">{stat.base_stat}</span>
                    </div>
                  </Tooltip>
                ))}
                <Tooltip content="Total">
                  <div className="flex flex-col items-center rounded-full bg-blue-200 p-1 gap-1">
                    <div className="rounded-full aspect-square p-1 min-w-8 flex items-center justify-center text-xs font-black text-white bg-blue-500">
                      TOT
                    </div>
                    <span className="font-black text-sm pb-1.5">
                      {pokemon?.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                    </span>
                  </div>
                </Tooltip>
              </>
            )}
          </div>
        </div>

        {/*Evolution*/}
        <div className="w-full">
          <h2 className="font-black text-sm text-center">EVOLUTION</h2>
          {!evolution ? (
            <>
              <Skeleton className="w-full h-16" />
            </>
          ) : (
            <PokemonEvolution evolution={evolution.chain} />
          )}
        </div>
      </div>

      {/*Navigation Panel*/}
      {pokemon && <PokemonNavigation selectedPokemon={pokemon} />}
    </div>
  );
};
