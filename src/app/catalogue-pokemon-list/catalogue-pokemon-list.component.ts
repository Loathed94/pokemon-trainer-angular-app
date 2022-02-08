import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PokemonWithImage } from "../models/pokemon.models";
import { PokemonService } from "../services/pokemon.services";
import { TrainersService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue-pokemon-list',
    templateUrl: './catalogue-pokemon-list.component.html',
    styleUrls: ['./catalogue-pokemon-list.component.css']
})
export class CataloguePokemonListComponent implements OnInit{

    constructor(
        private router: Router,
        private readonly pokemonService: PokemonService,
        private readonly trainerService: TrainersService){

    }

    //On initialization this component fetches the pokemon from pokemonService and makes sure that there's a trainer in the trainerService.
    ngOnInit(): void {
        if(this.trainerService.trainer === null){
            console.log("if");
            this.router.navigateByUrl('/login/catalogue');
        }
        else if(this.pokemonService.getPokemon().length === 0){
            console.log("Else if");
            console.log(this.pokemonService.pokeNameMap.entries());
            this.pokemonService.populatePokemon(this.trainerService.trainer);
        }
        else{
            console.log(this.pokemonService.pokeNameMap.entries());
            for(const pokemon of this.trainerService.trainerPokemon){
                console.log(pokemon);
                this.pokemonService.collectPokemonWithName(pokemon);
            }
        }
    }

    //A getter that returns the list of pokemon contained within the pokemonService.
    get pokemonList(): PokemonWithImage[]{
        return this.pokemonService.getPokemon();
    }

    //When a collect-button is clicked in the child-component of this one the pokemon is sent as a parameter and is marked as collected in the pokemonService and added to trainer in the trainerService.
    public handleCollectClick(pokemon: PokemonWithImage): void{
        this.pokemonService.collectPokemon(pokemon, this.trainerService.trainer);
        this.trainerService.patchTrainerPokemon();
    }
}