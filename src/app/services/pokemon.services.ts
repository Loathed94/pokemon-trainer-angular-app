import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Pokemon, PokemonRawData, PokemonWithImage } from "../models/pokemon.models";

@Injectable({
    providedIn: 'root'
})
export class PokemonService{
    private pokemon: Pokemon[] = [];
    private pokemonWithImg: PokemonWithImage[] = [];
    private error: string = '';
    private imgURL: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

    constructor(private readonly http: HttpClient){

    }

    public fetchPokemon(): void{
        //const pokeStorage: string | null = sessionStorage.getItem('pokemon');
        //console.log(pokeStorage)
        if(sessionStorage.getItem('pokemon') !== null){
            const pokeStorage: any = sessionStorage.getItem('pokemon');
            this.pokemonWithImg = pokeStorage.pokemon;
            console.log("Storage: ", this.pokemonWithImg);
        }
        this.http.get<PokemonRawData>('https://pokeapi.co/api/v2/pokemon?limit=200')
        .subscribe((pokemonRaw: PokemonRawData) => {
            //console.log(typeof pokemon);
            this.pokemon = pokemonRaw.results;
            for(let i = 0; i < this.pokemon.length; i++){
                const pokeImgURL: string[] = this.pokemon[i].url.split('/');
                this.pokemonWithImg.push({pokemon: this.pokemon[i], img: `${this.imgURL}${pokeImgURL[pokeImgURL.length-2]}.png`})
            }
            sessionStorage.setItem('pokemon', JSON.stringify({results: this.pokemonWithImg}))
        }, (error: HttpErrorResponse) =>{
            this.error = error.message;
        })
        //this.populatePokemonWithImages();
    }

    /*public populatePokemonWithImages(): void{
        console.log(this.pokemon);
        for(let i = 0; i < this.pokemon.length; i++){
            const pokeImgURL: string[] = this.pokemon[i].url.split('/');
            this.pokemonWithImg.push({pokemon: this.pokemon[i], img: `${this.imgURL}${pokeImgURL[pokeImgURL.length-1]}.png`})
        }
        console.log(this.pokemonWithImg);
    }*/

    public getPokemon(): PokemonWithImage[]{
        return this.pokemonWithImg;
    }

    public getError(): string{
        return this.error;
    }
}