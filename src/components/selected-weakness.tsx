import { useType } from "@/hooks/useType";
import { elementType } from "@/lib/utils";
import Image from "next/image";
import { Tooltip } from "@/components/ui/tooltip";

export const PokemonWeakness = ({ type }: { type: string }) => {
  const { data, isLoading } = useType(type);

  return data?.damage_relations.double_damage_from.map((type, index) => (
    <Tooltip key={index} content={type.name}>
      <div className="rounded-full p-1" style={{ background: elementType[type.name] }}>
        <Image src={`./assets/elements/${type.name ?? "normal"}.svg`} alt="Element Type" width={20} height={20} />
      </div>
    </Tooltip>
  ));
};
