import { Pipe, PipeTransform } from "@angular/core";

/*
 * Affiche la couleur correspondant au type du pokémon.
 * Prend en argument le type du pokémon.
 * Exemple d'utilisation:
 *   {{ pokemon.type | pokemonTypeColor }}
 */
@Pipe({ name: "pokemonTypeColor" })
export class PokemonTypeColorPipe implements PipeTransform {
  transform(type: string): string {
    let color: string;

    switch (type) {
      case "Feu":
        color = "red lighten-1";
        break;
      case "Eau":
        color = "blue lighten-1";
        break;
      case "Plante":
        color = "green lighten-1";
        break;
      case "Insecte":
        color = "brown lighten-1";
        break;
      case "Normal":
        color = "grey lighten-3";
        break;
      case "Vol":
        color = "blue lighten-3";
        break;
      case "Poison":
        color = "deep-purple accent-1";
        break;
      case "Fée":
        color = "pink lighten-4";
        break;
      case "Psy":
        color = "deep-purple darken-2";
        break;
      case "Electrik":
        color = "lime accent-1";
        break;
      case "Combat":
        color = "deep-orange";
        break;
      case "Roche":
        color = "brown darken-1";
        break;
      case "Sol":
        color = "yellow darken-3";
        break;
      case "Glace":
        color = "cyan lighten-2";
        break;
      case "Acier":
        color = "blue-grey";
        break;
      case "Dragon":
        color = "deep-purple darken-4";
        break;
      case "Ténèbres":
        color = "grey darken-4";
        break;
      case "Spectre":
        color = "deep-purple lighten-2";
        break;
      default:
        color = "grey";
        break;
    }

    return "chip " + color;
  }
}
