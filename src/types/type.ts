import { SpeciesType } from "@/types/pokemon";

export interface Type {
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: Generation;
  id: number;
  move_damage_class: TypeRelation;
  moves: {
    name: string;
    url: string;
  }[];
  name: string;
  names: Name[];
  past_damage_relations: any[];
  pokemon: Pokemon[];
}

export interface DamageRelations {
  double_damage_from: TypeRelation[];
  double_damage_to: TypeRelation[];
  half_damage_from: TypeRelation[];
  half_damage_to: TypeRelation[];
  no_damage_from: any[];
  no_damage_to: any[];
}

export interface TypeRelation {
  name: SpeciesType;
  url: string;
}

export interface Generation {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  generation: Generation;
}

export interface Name {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

export interface Pokemon {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}
