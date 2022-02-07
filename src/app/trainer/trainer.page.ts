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
        pokemon.collected = false;
        const pokeArray: string[] = [...this.trainerService.trainer!.pokemon];
        const index: number = pokeArray.indexOf(pokemon.pokemon.name);
        const newPokeArray: string[] = [];
        pokeArray.splice(index, 1);
        /*for (let i = 0; i < pokeArray.length; i++) {
            const pokemonString: string = pokeArray.pop() || '';
            if (pokemonString !== pokemon.pokemon.name){
                newPokeArray.push(pokemonString);
            }
        }*/
        this.trainerService.newTrainerPokemon(pokeArray);
        this.trainerService.patchTrainerPokemon();
        this.pokemonService.updatePokemonStorage();
    }

    get pokemonList(): PokemonWithImage[] {
        return this.pokemon;
    }

    ngOnInit(): void {
        const names: string [] =  this.trainerService.trainerPokemon;
        for (const name of names) {
            this.pokemon.push(this.pokemonService.pokemonFromMap(name));
        }
        console.log(this.trainerService.trainer);
        console.log(this.pokemonService.getPokemon());
    }
}
