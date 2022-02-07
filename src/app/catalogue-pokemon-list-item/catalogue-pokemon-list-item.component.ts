import { Component, EventEmitter, Input, Output } from "@angular/core";
import { PokemonWithImage } from "../models/pokemon.models";

@Component({
    selector: 'app-catalogue-pokemon-list-item',
    templateUrl: './catalogue-pokemon-list-item.component.html',
    styleUrls: ['catalogue-pokemon-list-item.component.css']
})
export class CataloguePokemonListItemComponent{
    @Input() pokemon: PokemonWithImage | undefined;
    @Output() clicked: EventEmitter<PokemonWithImage> = new EventEmitter();

    //Emits the pokemon up to the parent-component for some action on that level.
    public onClick():void{
        this.clicked.emit(this.pokemon);
    }
}