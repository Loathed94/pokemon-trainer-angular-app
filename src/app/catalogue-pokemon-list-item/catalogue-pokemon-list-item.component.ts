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
    private _disabled = false
    
    //A getter for the disabled boolean.
    public get disabled(): boolean{
        return this._disabled;
    }

    //A set-method for changing the value of disabled boolean.
    public setDisabled(bool: boolean): void {
        this._disabled = bool;
    }

    //Emits the pokemon up to the parent-component for some action on that level.
    public onClick():void{
        this.setDisabled(true);
        this.clicked.emit(this.pokemon);
    }
}