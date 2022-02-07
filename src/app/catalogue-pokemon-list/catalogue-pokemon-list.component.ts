import { Component, Input, OnInit } from "@angular/core";
import { PokemonWithImage } from "../models/pokemon.models";
import { Trainer } from "../models/trainer.models";
import { PokemonService } from "../services/pokemon.services";
import { TrainersService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue-pokemon-list',
    templateUrl: './catalogue-pokemon-list.component.html',
    styleUrls: ['./catalogue-pokemon-list.component.css']
})
export class CataloguePokemonListComponent implements OnInit{
    //@Input() trainer: Trainer | null = null;

    constructor(private readonly pokemonService: PokemonService,
        private readonly trainerService: TrainersService){

    }

    ngOnInit(): void {
        if(this.trainerService.trainer === null){
            this.trainerService.updateTrainerFromStorage();
        }
        this.pokemonService.fetchPokemon(this.trainerService.trainer);
    }

    get pokemonList(): PokemonWithImage[]{
        return this.pokemonService.getPokemon();
    }

    public handleCollectClick(pokemon: PokemonWithImage): void{
        this.pokemonService.collectPokemon(pokemon, this.trainerService.trainer);
        this.trainerService.patchTrainerPokemon();
        //this.trainerService.updateTrainerInStorage();
    }
}