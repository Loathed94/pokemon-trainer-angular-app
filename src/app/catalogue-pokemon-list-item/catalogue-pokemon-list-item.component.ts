import { Component, Input } from "@angular/core";
import { PokemonWithImage } from "../models/pokemon.models";

@Component({
    selector: 'app-catalogue-pokemon-list-item',
    templateUrl: './catalogue-pokemon-list-item.component.html',
    styleUrls: ['catalogue-pokemon-list-item.component.css']
})
export class CataloguePokemonListItemComponent{
    @Input() pokemon: PokemonWithImage | undefined;

}