

import { Injectable } from "@angular/core";
import { POKEMONS } from "./mock-pokemon-list";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService {
  getPokemonList(): Pokemon[] {
    return POKEMONS;
  }

  getPokemonById(pokemonId: number): Pokemon | undefined {
    return POKEMONS.find((pokemon) => pokemon.id == pokemonId);
  }

  getPokemonTypeList(): string[] {
    return [
      "Plante",
      "Feu",
      "Eau",
      "Insecte",
      "Normal",
      "Electrik",
      "Poison",
      "Fée",
      "Vol",
      "Combat",
      "Psy",
      "Roche",
      "Sol",
      "Glace",
      "Acier",
      "Dragon",
      "Ténèbres",
      "Spectre",
    ];
  }

  updatePokemon(pokemon: Pokemon): void {
    const index = POKEMONS.findIndex((p) => p.id === pokemon.id);
    if (index !== -1) {
      POKEMONS[index] = { ...pokemon };
    }
  }

  addPokemon(pokemon: Pokemon): void {
    // Génère un nouvel id unique
    const maxId = Math.max(...POKEMONS.map(p => p.id), 0);
    pokemon.id = maxId + 1;
    POKEMONS.push({ ...pokemon });
  }
}
