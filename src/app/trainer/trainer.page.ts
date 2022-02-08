import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
        private router: Router,
        private readonly trainerService: TrainersService,
        private readonly pokemonService: PokemonService
    ) { }

    logOut(){
        localStorage.clear();
        this.router.navigateByUrl('/login/');
    }

    public handleDeleteClick(pokemon: PokemonWithImage): void {
        pokemon.collected = false;
        const pokeArray: string[] = [...this.trainerService.trainer!.pokemon];
        const index: number = pokeArray.indexOf(pokemon.pokemon.name);
        pokeArray.splice(index, 1);
        this.trainerService.newTrainerPokemon(pokeArray);
        this.trainerService.patchTrainerPokemon();
        this.pokemonService.updatePokemonStorage();
    }

    get pokemonList(): PokemonWithImage[] {
        return this.pokemon;
    }

    ngOnInit(): void {
        console.log("OnInit Trainer");
        if(this.trainerService.trainer === null){
            //this.trainerService.updateTrainerFromStorage();
            //const storedTrainer: Trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || '');
            console.log("Rerouting from Trainer to Login");
            this.router.navigateByUrl('/login/trainer');
        }
        else if(this.pokemonService.getPokemon.length === 0){
            this.pokemonService.fetchPokemon(this.trainerService.trainer);
            const names: string [] =  this.trainerService.trainerPokemon;
            for (const name of names) {
                this.pokemon.push(this.pokemonService.pokemonFromMap(name));
            }
            console.log(this.trainerService.trainer);
            console.log(this.pokemonService.getPokemon());
        }
    }
}
