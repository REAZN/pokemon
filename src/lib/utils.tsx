import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SpeciesType, StatName } from "@/types/pokemon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const stats: { [key in StatName]: { acronym: string; color: string } } = {
  hp: {
    acronym: "HP",
    color: "#FF5959",
  },
  attack: {
    acronym: "ATK",
    color: "#F08030",
  },
  defense: {
    acronym: "DEF",
    color: "#6890F0",
  },
  "special-attack": {
    acronym: "SpA",
    color: "#f17cc7",
  },
  "special-defense": {
    acronym: "SpD",
    color: "#78C850",
  },
  speed: {
    acronym: "SPD",
    color: "#b79a2a",
  },
};

export const elementType: Record<SpeciesType, string> = {
  bug: "#A8B820",
  dark: "#ac9082",
  dragon: "#7038F8",
  electric: "#F8D030",
  fairy: "#EE99AC",
  fighting: "#d1423a",
  fire: "#F08030",
  flying: "#A890F0",
  ghost: "#705898",
  grass: "#78C850",
  ground: "#E0C068",
  ice: "#98D8D8",
  normal: "#d0d098",
  poison: "#b35bb3",
  psychic: "#F85888",
  rock: "#B8A038",
  steel: "#B8B8D0",
  water: "#799cec",
  stellar: "#FFD700",
};
