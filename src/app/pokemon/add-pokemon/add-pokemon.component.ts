import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-add-pokemon",
  template: `
    <h2>Ajouter un Pokémon</h2>
    <app-pokemon-form [pokemon]="pokemon"></app-pokemon-form>
  `,
})
export class AddPokemonComponent {
  pokemon: Pokemon = {
    id: 0,
    name: '',
    hp: 0,
    cp: 0,
    picture: '',
    types: [],
    created: new Date(),
  };

  constructor(private pokemonService: PokemonService, private router: Router) {}
}
