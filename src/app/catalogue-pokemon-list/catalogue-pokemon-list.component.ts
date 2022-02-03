import { Component } from "@angular/core";

@Component({
    selector: 'app-catalogue-pokemon-list',
    templateUrl: './catalogue-pokemon-list.component.html',
    styleUrls: ['./catalogue-pokemon-list.component.css']
})
export class CataloguePokemonListComponent{
    private allPokemon: string[] = [];

    get pokemonList(): string[]{
        return this.allPokemon;
    }
}