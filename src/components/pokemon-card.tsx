import { usePokemon } from "@/hooks/usePokemon";
import Image from "next/image";
import { TypeBadge } from "@/components/type-badge";
import { elementType } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const PokemonCard = ({ pokemon }: { pokemon: string }) => {
  const { data, isLoading } = usePokemon(pokemon);
  return isLoading ? (
    <Skeleton className="rounded-3xl min-w-48 w-full h-64" />
  ) : (
    <div className="relative flex flex-col min-w-52 w-full h-64">
      {data && (
        <div
          className="absolute top-16 left-1/2 -translate-x-1/2 w-24 h-24 blur-[40px] rounded-full bg-blue-900 -z-10"
          style={{ backgroundColor: elementType[data.types[0]?.type.name ?? 0] }}
        />
      )}
      <Image
        className="absolute top-0 left-1/2 -translate-x-1/2"
        src={
          data?.sprites.other?.home.front_default ??
          data?.sprites.other?.["official-artwork"].front_default ??
          "/assets/fallback.svg"
        }
        alt={data?.name ?? "pokemon"}
        width={125}
        height={125}
      />

      <div className="bg-foreground/90 rounded-3xl shadow-poke h-44 mt-auto">
        <div className="flex flex-col items-center justify-end h-full gap-1.5 pb-8">
          <span className="font-medium capitalize text-zinc-500 text-sm">Nº{data?.id.toString().padStart(3, "0")}</span>
          <h2 className="font-bold capitalize">{data?.name}</h2>
          <div className="flex gap-2">
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
