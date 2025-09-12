import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from './pokemon';

// Interfaces pour les réponses de l'API
interface PokeApiPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<{
    type: {
      name: string;
    };
  }>;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  private baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) {}

  // Récupérer un Pokémon par nom ou ID
  getPokemon(nameOrId: string | number): Observable<Pokemon> {
    return this.http.get<PokeApiPokemon>(`${this.baseUrl}/pokemon/${nameOrId}`)
      .pipe(
        map(apiPokemon => this.mapToPokemon(apiPokemon))
      );
  }

  // Rechercher des Pokémon par nom (autocomplétion)
  searchPokemon(query: string): Observable<string[]> {
    return this.http.get<any>(`${this.baseUrl}/pokemon?limit=1000`)
      .pipe(
        map(response => 
          response.results
            .filter((pokemon: any) => pokemon.name.includes(query.toLowerCase()))
            .map((pokemon: any) => pokemon.name)
            .slice(0, 10) // Limiter à 10 résultats
        )
      );
  }

  // Mapper les données de l'API vers notre modèle Pokemon
  private mapToPokemon(apiPokemon: PokeApiPokemon): Pokemon {
    const typeMap: { [key: string]: string } = {
      'grass': 'Plante',
      'fire': 'Feu',
      'water': 'Eau',
      'bug': 'Insecte',
      'normal': 'Normal',
      'electric': 'Electrik',
      'poison': 'Poison',
      'fairy': 'Fée',
      'flying': 'Vol',
      'fighting': 'Combat',
      'psychic': 'Psy',
      'rock': 'Roche',
      'ground': 'Sol',
      'ice': 'Glace',
      'steel': 'Acier',
      'dragon': 'Dragon',
      'dark': 'Ténèbres',
      'ghost': 'Spectre'
    };

    const hp = apiPokemon.stats.find(stat => stat.stat.name === 'hp')?.base_stat || 0;
    const attack = apiPokemon.stats.find(stat => stat.stat.name === 'attack')?.base_stat || 0;

    return {
      id: 0, // Sera généré lors de l'ajout
      name: apiPokemon.name.charAt(0).toUpperCase() + apiPokemon.name.slice(1),
      hp: hp,
      cp: Math.floor(attack / 2), // Conversion approximative
      picture: apiPokemon.sprites.other['official-artwork'].front_default || apiPokemon.sprites.front_default,
      types: apiPokemon.types.map(type => typeMap[type.type.name] || type.type.name),
      created: new Date()
    };
  }
}