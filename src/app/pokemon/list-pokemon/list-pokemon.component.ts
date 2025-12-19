import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-list-pokemon",
  templateUrl: "./list-pokemon.component.html",
})
export class ListPokemonComponent implements OnInit {
  pokemonList: Pokemon[];

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonList = this.pokemonService.getPokemonList();
  }

  goToPokemon(pokemon: Pokemon) {
    this.router.navigate(["/pokemons", pokemon.id]);
  }

  resetPokemonList() {
    const confirmed = confirm(
      'Êtes-vous sûr de vouloir réinitialiser la liste des Pokémon ? Tous les Pokémon ajoutés et modifications seront perdus.'
    );

    if (confirmed) {
      this.pokemonService.resetToDefault();
      this.pokemonList = this.pokemonService.getPokemonList();
    }
  }
}
