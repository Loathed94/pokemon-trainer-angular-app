import { Component, OnInit } from "@angular/core";
import { PokemonWithImage } from "../models/pokemon.models";
import { PokemonService } from "../services/pokemon.services";

@Component({
    selector: 'app-catalogue-pokemon-list',
    templateUrl: './catalogue-pokemon-list.component.html',
    styleUrls: ['./catalogue-pokemon-list.component.css']
})
export class CataloguePokemonListComponent implements OnInit{

    constructor(private readonly pokemonService: PokemonService){

    }

    ngOnInit(): void {
        this.pokemonService.fetchPokemon();
    }

    get pokemonList(): PokemonWithImage[]{
        return this.pokemonService.getPokemon();
    }

    public handleCollectClick(pokemon: PokemonWithImage): void{
        this.pokemonService.collectPokemon(pokemon);
    }
}