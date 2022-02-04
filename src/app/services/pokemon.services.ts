import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
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
    private pokeNameMap: Map<string, PokemonWithImage> = new Map();

    constructor(private readonly http: HttpClient){

    }

    public fetchPokemon(): void{
        if(sessionStorage.getItem('pokemon') !== null){
            const pokeStorage: PokemonWithImage[] = JSON.parse(sessionStorage.getItem('pokemon') || '');
            this.pokemonWithImg = pokeStorage;
            for(let i = 0; i < this.pokemonWithImg.length; i++){
                this.pokeNameMap.set(this.pokemonWithImg[i].pokemon.name, this.pokemonWithImg[i]);
            }
            return;
        }
        this.http.get<PokemonRawData>('https://pokeapi.co/api/v2/pokemon?limit=200')
        .subscribe((pokemonRaw: PokemonRawData) => {
            this.pokemon = pokemonRaw.results;
            for(let i = 0; i < this.pokemon.length; i++){
                const pokeImgURL: string[] = this.pokemon[i].url.split('/');
                const newPokemon: PokemonWithImage = {pokemon: this.pokemon[i], img: `${this.imgURL}${pokeImgURL[pokeImgURL.length-2]}.png`, id: parseInt(pokeImgURL[pokeImgURL.length-2]), collected: false};
                this.pokemonWithImg.push(newPokemon);
                this.pokeNameMap.set(newPokemon.pokemon.name, newPokemon);
            }
            sessionStorage.setItem('pokemon', JSON.stringify(this.pokemonWithImg));
        }, (error: HttpErrorResponse) =>{
            this.error = error.message;
        })
    }

    public getPokemon(): PokemonWithImage[]{
        return this.pokemonWithImg;
    }

    public getError(): string{
        return this.error;
    }

    public collectPokemon(pokemon: PokemonWithImage): void{
        pokemon.collected = true;
        this.updateStorageAndTrainer();
    }

    private updateStorageAndTrainer(): void{
        sessionStorage.setItem('pokemon', JSON.stringify(this.pokemonWithImg));
        //Update trainer locally and on API
    }

    public collectPokemonWithName(name: string): void {
        const namedPokemon: PokemonWithImage = this.pokeNameMap.get(name) || {pokemon: {name: '', url: ''}, img: '', id: NaN, collected: false};
        namedPokemon.collected = true;
        this.updateStorageAndTrainer();
    }

    /*private createHeaders(){
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': 'API-KEY'
        })
    }

    patchFunction(payload: string): void{
        const headers = this.createHeaders()
        this.http.patch('api url', payload, {headers})
    }*/
}