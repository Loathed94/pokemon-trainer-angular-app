import { Component, OnInit } from "@angular/core";
import { PokemonWithImage } from "../models/pokemon.models";
import { PokemonService } from "../services/pokemon.services";
import { TrainersService } from "../services/trainer.service";



@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.page.html',
    styleUrls: ['./trainer.page.css']
})
export class TrainerPage
    implements OnInit
{
    private pokemon: PokemonWithImage [] = [];

    get trainerName(): string {
        return this.trainerService.trainerName;

    }
    constructor(
        private readonly trainerService: TrainersService,
        private readonly pokemonService: PokemonService
    ) { }

    logOut(){
        localStorage.clear()
    }

    public handleDeleteClick(pokemon: PokemonWithImage): void {
        //Delete from trainer list
    }

    get pokemonList(): PokemonWithImage[] {
        return this.pokemon;
    }

    ngOnInit(): void {
        const names: string [] =  this.trainerService.trainerPokemon;
        for (const name of names) {
            this.pokemon.push(this.pokemonService.pokemonFromMap(name));
        }
    }
}
