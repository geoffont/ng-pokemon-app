import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokeapiService } from '../pokeapi.service';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-search',
  template: `
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-m2">
          <div class="card-panel">
            <h4 class="center">Ajouter un Pokémon depuis PokeAPI</h4>
            
            <div class="input-field" style="margin-top: 30px;">
              <label for="search" class="active">Rechercher un Pokémon</label>
              <input
                type="text"
                id="search"
                [(ngModel)]="searchTerm"
                (input)="onSearchChange()"
                placeholder="Tapez le nom d'un Pokémon (ex: pikachu, charizard...)"
                class="validate">
            </div>

            <!-- Suggestions de recherche -->
            <div *ngIf="suggestions.length > 0" class="collection" style="margin-top: 10px; max-height: 300px; overflow-y: auto;">
              <a *ngFor="let suggestion of suggestions"
                 (click)="selectPokemon(suggestion)"
                 class="collection-item waves-effect"
                 style="cursor: pointer;">
                {{ suggestion }}
              </a>
            </div>

            <!-- Pokemon trouvé -->
            <div *ngIf="foundPokemon" class="card horizontal" style="margin-top: 20px;">
              <div class="card-image" style="display: flex; align-items: center; justify-content: center; padding: 20px; background-color: #f5f5f5;">
                <img [src]="foundPokemon.picture" [alt]="foundPokemon.name" style="max-width: 200px; height: auto;">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h5 style="margin-top: 0; text-transform: capitalize;">{{ foundPokemon.name }}</h5>
                  <p style="margin: 8px 0;"><strong>HP:</strong> {{ foundPokemon.hp }}</p>
                  <p style="margin: 8px 0;"><strong>CP:</strong> {{ foundPokemon.cp }}</p>
                  <p style="margin: 8px 0;">
                    <strong>Types:</strong><br>
                    <span *ngFor="let type of foundPokemon.types"
                          class="{{ type | pokemonTypeColor }}"
                          style="display: inline-block; margin: 4px 4px 4px 0; padding: 4px 12px; border-radius: 4px; color: white; font-size: 12px;">
                      {{ type }}
                    </span>
                  </p>
                </div>
                <div class="card-action">
                  <button (click)="addPokemon()"
                          class="waves-effect waves-light btn green"
                          [disabled]="isAdding"
                          style="margin-right: 10px;">
                    {{ isAdding ? 'Ajout en cours...' : 'Ajouter ce Pokémon' }}
                  </button>
                  <button (click)="clearSearch()"
                          class="waves-effect waves-light btn grey">
                    Annuler
                  </button>
                </div>
              </div>
            </div>

            <!-- Loading -->
            <div *ngIf="isLoading" class="center" style="margin-top: 30px; padding: 20px;">
              <div class="preloader-wrapper small active">
                <div class="spinner-layer spinner-green-only">
                  <div class="circle-clipper left">
                    <div class="circle"></div>
                  </div>
                  <div class="gap-patch">
                    <div class="circle"></div>
                  </div>
                  <div class="circle-clipper right">
                    <div class="circle"></div>
                  </div>
                </div>
              </div>
              <p style="margin-top: 15px;">Recherche en cours...</p>
            </div>

            <!-- Message d'erreur -->
            <div *ngIf="errorMessage" class="card-panel red lighten-4" style="margin-top: 20px;">
              <span class="red-text text-darken-2"><strong>⚠️ Erreur:</strong> {{ errorMessage }}</span>
            </div>

            <!-- Retour -->
            <div class="center" style="margin-top: 20px;">
              <a routerLink="/pokemons" class="waves-effect waves-light btn blue">
                Retour à la liste
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class PokemonSearchComponent {
  searchTerm = '';
  suggestions: string[] = [];
  foundPokemon: Pokemon | null = null;
  isLoading = false;
  isAdding = false;
  errorMessage = '';

  constructor(
    private pokeapiService: PokeapiService,
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  onSearchChange() {
    if (this.searchTerm.length >= 2) {
      this.pokeapiService.searchPokemon(this.searchTerm).subscribe(
        suggestions => {
          this.suggestions = suggestions;
        },
        error => {
          console.error('Erreur lors de la recherche:', error);
        }
      );
    } else {
      this.suggestions = [];
    }
  }

  selectPokemon(pokemonName: string) {
    this.searchTerm = pokemonName;
    this.suggestions = [];
    this.isLoading = true;
    this.errorMessage = '';

    this.pokeapiService.getPokemon(pokemonName).subscribe(
      pokemon => {
        this.foundPokemon = pokemon;
        this.isLoading = false;
      },
      error => {
        this.errorMessage = `Pokémon "${pokemonName}" non trouvé.`;
        this.isLoading = false;
        console.error('Erreur lors de la récupération du Pokémon:', error);
      }
    );
  }

  addPokemon() {
    if (this.foundPokemon) {
      this.isAdding = true;
      this.pokemonService.addPokemon(this.foundPokemon);
      
      // Simuler un délai pour l'UX
      setTimeout(() => {
        this.router.navigate(['/pokemons']);
      }, 500);
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.suggestions = [];
    this.foundPokemon = null;
    this.errorMessage = '';
  }
}