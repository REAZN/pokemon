interface Pokemon {
  name: string;
  url: string;
}

export interface Pokedex {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
