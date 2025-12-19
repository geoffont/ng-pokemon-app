import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-battle-selection',
  templateUrl: './battle-selection.component.html'
})
export class BattleSelectionComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  selectedPokemon1Id: number | null = null;
  selectedPokemon2Id: number | null = null;
  selectedPokemon1: Pokemon | null = null;
  selectedPokemon2: Pokemon | null = null;

  constructor(
    private pokemonService: PokemonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getPokemonList();
  }

  onPokemon1Change(event: any): void {
    const id = parseInt(event.target.value);
    this.selectedPokemon1Id = id;
    this.selectedPokemon1 = this.pokemonService.getPokemonById(id) || null;
  }

  onPokemon2Change(event: any): void {
    const id = parseInt(event.target.value);
    this.selectedPokemon2Id = id;
    this.selectedPokemon2 = this.pokemonService.getPokemonById(id) || null;
  }

  isValidSelection(): boolean {
    return this.selectedPokemon1Id !== null
      && this.selectedPokemon2Id !== null
      && this.selectedPokemon1Id !== this.selectedPokemon2Id;
  }

  startBattle(): void {
    if (this.isValidSelection()) {
      this.router.navigate(['/battle/arena'], {
        queryParams: {
          p1: this.selectedPokemon1Id,
          p2: this.selectedPokemon2Id
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/pokemons']);
  }
}
