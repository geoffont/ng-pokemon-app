import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { BorderCardDirective } from "./border-card.directive";
import { DetailPokemonComponent } from "./detail-pokemon/detail-pokemon.component";
import { EditPokemonComponent } from "./edit-pokemon/edit-pokemon.component";
import { ListPokemonComponent } from "./list-pokemon/list-pokemon.component";
import { PokemonFormComponent } from "./pokemon-form/pokemon-form.component";
import { PokemonTypeColorPipe } from "./pokemon-type-color.pipe";
import { PokemonService } from "./pokemon.service";
import { AddPokemonComponent } from "./add-pokemon/add-pokemon.component";
import { PokemonSearchComponent } from "./pokemon-search/pokemon-search.component";
import { BattleSelectionComponent } from "./battle-selection/battle-selection.component";
import { BattleArenaComponent } from "./battle-arena/battle-arena.component";
import { BattleService } from "./battle.service";

const pokemonRoutes: Routes = [
  { path: "battle/selection", component: BattleSelectionComponent },
  { path: "battle/arena", component: BattleArenaComponent },
  { path: "pokemons/search", component: PokemonSearchComponent },
  { path: "pokemons/add", component: AddPokemonComponent },
  { path: "pokemons/edit/:id", component: EditPokemonComponent },
  { path: "pokemons", component: ListPokemonComponent },
  { path: "pokemons/:id", component: DetailPokemonComponent },
];

@NgModule({
  declarations: [
    ListPokemonComponent,
    DetailPokemonComponent,
    BorderCardDirective,
    PokemonTypeColorPipe,
    PokemonFormComponent,
    EditPokemonComponent,
    AddPokemonComponent,
    PokemonSearchComponent,
    BattleSelectionComponent,
    BattleArenaComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(pokemonRoutes)],
  providers: [PokemonService, BattleService],
})
export class PokemonModule {}
