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
export class TrainerPage implements OnInit{
    private pokemon: PokemonWithImage [] = [];

    //Returns the name of the trainer, used to html to display name.
    public get trainerName(): string {
        return this.trainerService.trainerName;

    }
    constructor(
        private router: Router,
        private readonly trainerService: TrainersService,
        private readonly pokemonService: PokemonService
    ) { }

    //Logs out the user, clearing localStorage and redirecting user to Login-page.
    public logOut(){
        localStorage.clear();
        this.pokemonService.clearPokemon();
        this.trainerService.setTrainer(null);
        this.router.navigateByUrl('/login/');
    }

    //When a pokemon's delete button is clicked the pokemon is made uncollected and is removed from the trainer's pokemon list.
    //API and localStorage are then updated with the new version of the trainer.
    public handleDeleteClick(pokemon: PokemonWithImage): void {
        pokemon.collected = false;
        const pokeArray: string[] = [...this.trainerService.trainer!.pokemon];
        const index: number = pokeArray.indexOf(pokemon.pokemon.name);
        pokeArray.splice(index, 1);
        this.trainerService.newTrainerPokemon(pokeArray);
        this.trainerService.patchTrainerPokemon();
        this.pokemonService.updatePokemonStorage();
    }

    //Returns the list of pokemon that the trainer owns for the html that displays them.
    public get pokemonList(): PokemonWithImage[] {
        return this.pokemon;
    }

    //On initialization the page makes sure trainer is validated after which it also makes sure pokemon exist in state, after it loads the pokemon the trainer owns into the page.
    ngOnInit(): void {
        if(this.trainerService.trainer === null){
            this.router.navigateByUrl('/login/trainer');
        }
        else if(this.pokemonService.getPokemon().length === 0){
            this.pokemonService.fetchPokemon(this.trainerService.trainer);
        }
        const names: string [] =  this.trainerService.trainerPokemon;
        for (const name of names) {
            this.pokemon.push(this.pokemonService.pokemonFromMap(name));
        }
    }
}
