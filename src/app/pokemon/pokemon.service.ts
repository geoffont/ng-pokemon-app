

import { Injectable } from "@angular/core";
import { POKEMONS } from "./mock-pokemon-list";
import { Pokemon } from "./pokemon";

@Injectable()
export class PokemonService {
  private readonly STORAGE_KEY = 'pokemon-list';
  private pokemonList: Pokemon[];

  constructor() {
    this.pokemonList = this.loadFromStorage();
  }

  private loadFromStorage(): Pokemon[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Erreur lors du chargement des Pokémon depuis LocalStorage', e);
        return [...POKEMONS];
      }
    }
    // Si aucune donnée en LocalStorage, utiliser les données mock et les sauvegarder
    const initialData = [...POKEMONS];
    this.saveToStorage(initialData);
    return initialData;
  }

  private saveToStorage(pokemons: Pokemon[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pokemons));
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des Pokémon dans LocalStorage', e);
    }
  }

  getPokemonList(): Pokemon[] {
    return this.pokemonList;
  }

  getPokemonById(pokemonId: number): Pokemon | undefined {
    return this.pokemonList.find((pokemon) => pokemon.id == pokemonId);
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
    const index = this.pokemonList.findIndex((p) => p.id === pokemon.id);
    if (index !== -1) {
      this.pokemonList[index] = { ...pokemon };
      this.saveToStorage(this.pokemonList);
    }
  }

  addPokemon(pokemon: Pokemon): void {
    // Génère un nouvel id unique
    const maxId = Math.max(...this.pokemonList.map(p => p.id), 0);
    pokemon.id = maxId + 1;
    this.pokemonList.push({ ...pokemon });
    this.saveToStorage(this.pokemonList);
  }

  deletePokemon(pokemonId: number): void {
    const index = this.pokemonList.findIndex((p) => p.id === pokemonId);
    if (index !== -1) {
      this.pokemonList.splice(index, 1);
      this.saveToStorage(this.pokemonList);
    }
  }

  resetToDefault(): void {
    this.pokemonList = [...POKEMONS];
    this.saveToStorage(this.pokemonList);
  }
}
