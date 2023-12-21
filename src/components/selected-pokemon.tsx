"use client";

import Image from "next/image";
import { usePokemon } from "@/hooks/usePokemon";
import { cn, elementType, stats } from "@/lib/utils";
import { TypeBadge } from "@/components/type-badge";
import { ChevronLeftIcon, EyeOffIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Pokemon } from "@/types/pokemon";
import { useQueryState } from "next-usequerystate";

export const SelectedPokemon = ({
  selected,
  handle,
  className,
}: {
  selected: string | number;
  handle?: boolean;
  className?: string;
}) => {
  const { data, isLoading } = usePokemon(selected);

  return (
    <div
      className={cn(
        "relative w-[25rem] h-[calc(100vh-4rem)] bg-foreground rounded-3xl shadow-poke overflow-hidden",
        className,
        handle && "rounded-b-none cursor-grab",
      )}
    >
      {/*Top image/background*/}
      <div className="relative w-full h-72 pointer-events-none">
        {handle && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full w-24 h-1.5 z-40 bg-white/70" />
        )}
        <div
          className="absolute bottom-14 left-1/2 -translate-x-1/2 w-[calc(175%)] aspect-square rounded-full"
          style={{
            background: `linear-gradient(130deg, ${
              data?.types[0].type.name ? elementType[data.types[0].type.name] : "#fcfcfc"
            } 60%, rgba(255,255,255,1) 100%)`,
          }}
        />
        <Image
          className="absolute left-1/2 top-[40%] -translate-y-1/2 -translate-x-1/2"
          style={{ maskImage: "linear-gradient(130deg, rgba(0,0,0,.6), rgba(0,0,0,0))" }}
          src={`./assets/elements/${data?.types[0].type.name ?? "normal"}.svg`}
          alt="Element Type"
          width={200}
          height={200}
        />
        <Image
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          src={
            data?.sprites.other?.home.front_default ??
            data?.sprites.other?.["official-artwork"].front_default ??
            "/assets/fallback.svg"
          }
          alt={data?.name ?? "pokemon"}
          width={250}
          height={250}
        />
      </div>

      {/*Content*/}
      <div className="flex flex-col items-center gap-4 p-8 pt-4">
        {/*Number*/}
        {isLoading ? (
          <Skeleton className="w-12 h-4" />
        ) : (
          <span className="font-medium capitalize text-zinc-500 text-sm -mb-4">
            Nº{data?.id.toString().padStart(3, "0")}
          </span>
        )}

        {/*Name*/}
        {isLoading ? (
          <Skeleton className="w-64 h-6" />
        ) : (
          <h2 className="font-black capitalize text-2xl">{data?.name}</h2>
        )}

        {/*Element types*/}
        <div className="flex gap-2">
          {isLoading && (
            <>
              <Skeleton className="w-24 h-8" />
              <Skeleton className="w-24 h-8" />
            </>
          )}
          {data?.types.map((type, index) => (
            <TypeBadge key={index} type={type.type.name}>
              {type.type.name}
            </TypeBadge>
          ))}
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
            {data?.abilities.map((ability, index) =>
              ability.is_hidden ? (
                <div
                  key={index}
                  className="flex items-center justify-center gap-2 rounded-full bg-elements py-2 text-center w-full capitalize ring-1 ring-red-300"
                >
                  <span>{ability.ability.name}</span>
                  <EyeOffIcon className="w-6 h-6 text-gray-400" />
                </div>
              ) : (
                <div
                  key={index}
                  className="rounded-full bg-elements py-2 text-center w-full capitalize ring-1 ring-blue-200"
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
                {data?.height ? `${data?.height / 10}m` : "??"}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-black text-sm">WEIGHT</h2>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-full" />
            ) : (
              <div className="rounded-full bg-elements py-2 text-center w-full">
                {data?.weight ? `${data?.weight / 10}kg` : "??"}
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
              <div className="rounded-full bg-elements py-2 text-center w-full">TODO</div>
            )}
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-black text-sm">BASE EXP</h2>
            {isLoading ? (
              <Skeleton className="h-10 w-full rounded-full" />
            ) : (
              <div className="rounded-full bg-elements py-2 text-center w-full">{data?.base_experience ?? "??"}</div>
            )}
          </div>
        </div>

        {/*Stats*/}
        <div className="w-full">
          <h2 className="font-black text-sm text-center">STATS</h2>
          <div className="flex justify-between">
            {isLoading ? (
              <>
                {Array(7)
                  .fill("")
                  .map((_, index) => (
                    <Skeleton key={index} className="h-16 w-10 rounded-full" />
                  ))}
              </>
            ) : (
              <>
                {data?.stats.map((stat, index) => (
                  <div key={index} className="flex flex-col items-center rounded-full bg-elements p-1 gap-1">
                    <div
                      className="rounded-full aspect-square p-1 min-w-8 flex items-center justify-center text-xs font-black text-white"
                      style={{ backgroundColor: stats[stat.stat.name].color }}
                    >
                      {stats[stat.stat.name].acronym}
                    </div>
                    <span className="font-black text-sm pb-1.5">{stat.base_stat}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center rounded-full bg-blue-200 p-1 gap-1">
                  <div className="rounded-full aspect-square p-1 min-w-8 flex items-center justify-center text-xs font-black text-white bg-blue-500">
                    TOT
                  </div>
                  <span className="font-black text-sm pb-1.5">
                    {data?.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="">
          <h2 className="font-black text-sm text-center">EVOLUTION</h2>
        </div>
        {data && <PokemonNavigation selectedPokemon={data} />}
      </div>
    </div>
  );
};

const PokemonNavigation = ({ selectedPokemon }: { selectedPokemon: Pokemon }) => {
  const { data: next } = usePokemon(selectedPokemon.id + 1);
  const { data: previous } = usePokemon(selectedPokemon.id - 1);
  const [selected, setSelected] = useQueryState("selected");

  return (
    <div className="absolute bottom-2 w-[calc(100%-1rem)] flex items-center justify-between rounded-2xl bg-gray-200">
      <button
        className="flex items-center justify-start w-1/2 gap-1 py-6 px-4 cursor-pointer"
        onClick={() => setSelected(previous!.name)}
      >
        <ChevronLeftIcon className="w-5 h-5 text-gray-500" />
        <Image
          className=""
          src={
            previous?.sprites.other?.home.front_default ??
            previous?.sprites.other?.["official-artwork"].front_default ??
            "/assets/fallback.svg"
          }
          alt={previous?.name ?? "pokemon"}
          width={35}
          height={35}
        />
        <div className="flex flex-col items-start">
          <span className="capitalize font-bold text-sm">{previous?.name}</span>
          <span className="font-medium capitalize text-zinc-500 text-xs">
            {previous && <>Nº{previous?.id.toString().padStart(3, "0")}</>}
          </span>
        </div>
      </button>
      <div className="h-6 w-[1px] bg-slate-800" />
      <button className="flex items-center justify-end w-1/2 gap-1 py-6 px-4" onClick={() => setSelected(next!.name)}>
        <div className="flex flex-col items-end">
          <span className="font-medium capitalize text-zinc-500 text-xs">
            {next && <>Nº{next?.id.toString().padStart(3, "0")}</>}
          </span>
          <span className="capitalize font-bold text-sm">{next?.name}</span>
        </div>
        <Image
          className=""
          src={
            next?.sprites.other?.home.front_default ??
            next?.sprites.other?.["official-artwork"].front_default ??
            "/assets/fallback.svg"
          }
          alt={next?.name ?? "pokemon"}
          width={35}
          height={35}
        />
        <ChevronLeftIcon className="w-5 h-5 rotate-180 text-gray-500" />
      </button>
    </div>
  );
};
