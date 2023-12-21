"use client";

import { usePokedex } from "@/hooks/usePokedex";
import { PokemonCard } from "@/components/pokemon-card";
import { SelectedPokemon } from "@/components/selected-pokemon";
import { useEffect, useState } from "react";
import { useQueryState } from "next-usequerystate";
import { SearchIcon } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@/components/ui/skeleton";
import { Drawer } from "vaul";

export default function Home() {
  const [selected, setSelected] = useQueryState("selected");
  const [search, setSearch] = useQueryState("search");
  const [desktop, setDesktop] = useState<boolean>(false);

  const { ref, inView } = useInView({ rootMargin: "400px" });
  const { data, isLoading, fetchNextPage, hasNextPage } = usePokedex({ search: search || "" });

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  useEffect(() => {
    const updateMedia = () => {
      if (window.innerWidth > 900) {
        setDesktop(true);
      } else {
        setDesktop(false);
      }
    };
    updateMedia();
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  }, []);

  return (
    <main>
      <div className="relative flex center justify-between gap-10 mt-8 h-fit">
        <section className="w-full">
          <search className="flex items-center bg-foreground rounded-xl shadow-poke h-14 text-sm px-4">
            <SearchIcon className="w-6 h-6 text-red-500" />
            <input
              className="bg-transparent h-full w-full pl-4 outline-0 font-medium text-lg"
              value={search ?? ""}
              placeholder="Search Pokémon"
              onChange={(e) => setSearch(e.target.value)}
            />
          </search>
          <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
            {isLoading ? (
              Array(15)
                .fill("")
                .map((_, index) => <Skeleton key={index} className="rounded-3xl min-w-52 w-full h-64" />)
            ) : (
              <>
                {data?.pages.map((group, index) =>
                  group.results.map((pokemon, index) => (
                    <Drawer.Root key={index} open={!desktop && undefined}>
                      <Drawer.Trigger onClick={() => setSelected(pokemon.name)}>
                        <PokemonCard pokemon={pokemon.name} />
                      </Drawer.Trigger>
                      <Drawer.Portal>
                        <Drawer.Overlay className="fixed z-30 inset-0 bg-black/40" />
                        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-40 flex h-full max-h-[95%]">
                          <SelectedPokemon selected={selected ?? "bulbasaur"} className="w-full" handle />
                        </Drawer.Content>
                      </Drawer.Portal>
                    </Drawer.Root>
                  )),
                )}
              </>
            )}
          </div>
          <button
            onClick={() => fetchNextPage()}
            ref={ref}
            className="w-full bg-foreground shadow-poke rounded-lg py-2 my-4 font-bold hover:brightness-125"
          >
            Load more
          </button>
        </section>
        {desktop && (
          <section className="sticky top-8 h-full">
            <SelectedPokemon selected={selected ?? "bulbasaur"} />
          </section>
        )}
      </div>
    </main>
  );
}
