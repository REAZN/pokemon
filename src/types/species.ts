export interface Species {
  base_happiness: number;
  capture_rate: number;
  color: {
    name: string;
    url: string;
  };
  egg_groups: Color[];
  evolution_chain: EvolutionChain;
  evolves_from_species: {
    name: string;
    url: string;
  };
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: {
    name: string;
    url: string;
  };
  growth_rate: {
    name: string;
    url: string;
  };
  habitat: null;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: {
    name: string;
    url: string;
  };
  varieties: Variety[];
}

interface Color {
  name: string;
  url: string;
}

interface EvolutionChain {
  url: string;
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
}

interface Genus {
  genus: string;
  language: {
    name: string;
    url: string;
  };
}

interface Name {
  language: {
    name: string;
    url: string;
  };
  name: string;
}

interface PalParkEncounter {
  area: {
    name: string;
    url: string;
  };
  base_score: number;
  rate: number;
}

interface PokedexNumber {
  entry_number: number;
  pokedex: {
    name: string;
    url: string;
  };
}

interface Variety {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}
