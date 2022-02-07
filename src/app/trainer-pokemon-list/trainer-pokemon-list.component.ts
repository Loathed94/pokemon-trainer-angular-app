import { Component, Input, Output,EventEmitter } from "@angular/core";
import { PokemonWithImage } from "../models/pokemon.models";

@Component({
    selector: 'app-trainer-pokemon-list',
    templateUrl: './trainer-pokemon-list.component.html',
    styleUrls: ['./trainer-pokemon-list.component.css']
})

export class TrainerPokemonListComponent{
    @Input() pokemon: PokemonWithImage | undefined;
    @Output() clicked: EventEmitter<PokemonWithImage> = new EventEmitter();

    //private image: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this!.pokemon!.id}.png` || "";

    get image(): string {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this!.pokemon!.id}.png`;
    }

    public onClick(): void {
        this.clicked.emit(this.pokemon);
    }
}

//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png