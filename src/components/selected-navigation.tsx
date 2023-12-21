import type { Pokemon } from "@/types/pokemon";
import { usePokemon } from "@/hooks/usePokemon";
import { useQueryState } from "next-usequerystate";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";

export const PokemonNavigation = ({ selectedPokemon }: { selectedPokemon: Pokemon }) => {
  const { data: next } = usePokemon(selectedPokemon.id + 1);
  const { data: previous } = usePokemon(selectedPokemon.id - 1);
  const [selected, setSelected] = useQueryState("selected");

  return (
    <div className="absolute bottom-2 w-[calc(100%-1rem)] left-2 flex items-center justify-between rounded-2xl bg-gray-200">
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
          <span className="font-medium capitalize text-zinc-500 text-xs">
            {previous && <>Nº{previous?.id.toString().padStart(3, "0")}</>}
          </span>
          <span className="capitalize font-bold text-sm truncate">{previous?.name}</span>
        </div>
      </button>
      <div className="h-6 w-[1px] bg-slate-800" />
      <button className="flex items-center justify-end w-1/2 gap-1 py-6 px-4" onClick={() => setSelected(next!.name)}>
        <div className="flex flex-col items-end">
          <span className="font-medium capitalize text-zinc-500 text-xs">
            {next && <>Nº{next?.id.toString().padStart(3, "0")}</>}
          </span>
          <span className="capitalize font-bold text-sm truncate">{next?.name}</span>
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
