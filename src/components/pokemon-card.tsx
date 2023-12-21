import { usePokemon } from "@/hooks/usePokemon";
import Image from "next/image";
import { TypeBadge } from "@/components/type-badge";
import { cn, elementType } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { SpeciesType } from "@/types/pokemon";

export const PokemonCard = ({ pokemon, selected }: { pokemon: string; selected: string }) => {
  const { data, isLoading } = usePokemon(pokemon);
  return (
    <div className="relative flex flex-col min-w-52 w-full h-64 group">
      {data && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-24 blur-[40px] rounded-full bg-blue-900 -z-10"
          style={{ backgroundColor: elementType[data.types[0]?.type.name ?? "normal"] }}
        />
      )}
      <Image
        className="absolute top-0 left-1/2 -translate-x-1/2 group-hover:scale-105 transition-all duration-300 ease-in-out"
        src={
          data?.sprites.other?.home.front_default ??
          data?.sprites.other?.["official-artwork"].front_default ??
          "/assets/fallback.svg"
        }
        alt={data?.name ?? "pokemon"}
        width={125}
        height={125}
        priority
      />

      <div
        className={cn(
          "bg-foreground/90 rounded-3xl shadow-poke h-44 mt-auto",
          selected === pokemon && "outline outline-1 outline-gray-300",
        )}
      >
        <div className="flex flex-col items-center justify-end h-full gap-1.5 pb-8">
          {isLoading ? (
            <Skeleton className="w-12 h-4" />
          ) : (
            <span className="font-medium capitalize text-zinc-500 text-sm">
              Nº{data?.id.toString().padStart(3, "0")}
            </span>
          )}

          {isLoading ? <Skeleton className="w-1/2 h-6" /> : <h2 className="font-black capitalize">{data?.name}</h2>}

          <div className="flex gap-2">
            {isLoading && (
              <>
                <Skeleton className="w-16 h-8" />
                <Skeleton className="w-16 h-8" />
              </>
            )}
            {data?.types.map((type, index) => (
              <TypeBadge key={index} type={type.type.name}>
                {type.type.name}
              </TypeBadge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
