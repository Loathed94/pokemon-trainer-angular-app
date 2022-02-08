import { Component, Input, Output,EventEmitter } from "@angular/core";
import { environment } from "src/environments/environment";
import { PokemonWithImage } from "../models/pokemon.models";

@Component({
    selector: 'app-trainer-pokemon-list',
    templateUrl: './trainer-pokemon-list.component.html',
    styleUrls: ['./trainer-pokemon-list.component.css']
})
export class TrainerPokemonListComponent{
    @Input() pokemon: PokemonWithImage | undefined;
    @Output() clicked: EventEmitter<PokemonWithImage> = new EventEmitter();
    private POKEMON_IMAGE = environment.pokemonImage;


    //A getter for the image of the pokemon.
    get image(): string {
        return `${this.POKEMON_IMAGE}${this!.pokemon!.id}.png`;
    }

    //Button-click method that emits the pokemon to the parent-component for action.
    public onClick(): void {
        this.clicked.emit(this.pokemon);
    }
}