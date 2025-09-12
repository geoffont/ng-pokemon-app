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
            
            <div class="input-field">
              <input 
                type="text" 
                id="search" 
                [(ngModel)]="searchTerm"
                (input)="onSearchChange()"
                placeholder="Tapez le nom d'un Pokémon (ex: pikachu, charizard...)"
                class="validate">
              <label for="search">Rechercher un Pokémon</label>
            </div>

            <!-- Suggestions de recherche -->
            <div *ngIf="suggestions.length > 0" class="collection">
              <a *ngFor="let suggestion of suggestions" 
                 (click)="selectPokemon(suggestion)"
                 class="collection-item waves-effect">
                {{ suggestion }}
              </a>
            </div>

            <!-- Pokemon trouvé -->
            <div *ngIf="foundPokemon" class="card horizontal">
              <div class="card-image">
                <img [src]="foundPokemon.picture" [alt]="foundPokemon.name" style="max-width: 200px;">
              </div>
              <div class="card-stacked">
                <div class="card-content">
                  <h5>{{ foundPokemon.name }}</h5>
                  <p><strong>HP:</strong> {{ foundPokemon.hp }}</p>
                  <p><strong>CP:</strong> {{ foundPokemon.cp }}</p>
                  <p><strong>Types:</strong> 
                    <span *ngFor="let type of foundPokemon.types" 
                          class="{{ type | pokemonTypeColor }}">
                      {{ type }}
                    </span>
                  </p>
                </div>
                <div class="card-action">
                  <button (click)="addPokemon()" 
                          class="waves-effect waves-light btn green"
                          [disabled]="isAdding">
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
            <div *ngIf="isLoading" class="center">
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
              <p>Recherche en cours...</p>
            </div>

            <!-- Message d'erreur -->
            <div *ngIf="errorMessage" class="card-panel red lighten-4">
              <span class="red-text">{{ errorMessage }}</span>
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