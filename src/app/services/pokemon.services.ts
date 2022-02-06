import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Pokemon, PokemonRawData, PokemonWithImage } from "../models/pokemon.models";
import { Trainer } from "../models/trainer.models";

@Injectable({
    providedIn: 'root'
})
export class PokemonService{
    private pokemon: Pokemon[] = [];
    private pokemonWithImg: PokemonWithImage[] = [];
    private error: string = '';
    private imgURL: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
    private pokeNameMap: Map<string, PokemonWithImage> = new Map();
    private POKEMON_KEY = environment.pokemonItem;

    constructor(private readonly http: HttpClient){

    }

    public fetchPokemon(trainer: Trainer | null): void{
        if(sessionStorage.getItem('pokemon') !== null){
            const pokeStorage: PokemonWithImage[] = JSON.parse(sessionStorage.getItem(this.POKEMON_KEY) || '');
            this.pokemonWithImg = pokeStorage;
            for(let i = 0; i < this.pokemonWithImg.length; i++){
                this.pokeNameMap.set(this.pokemonWithImg[i].pokemon.name, this.pokemonWithImg[i]);
            }
            for(let i = 0; i < trainer!.pokemon.length; i++){
                this.collectPokemonWithName(trainer!.pokemon[i]);
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
            for(let i = 0; i < trainer!.pokemon.length; i++){
                this.collectPokemonWithName(trainer!.pokemon[i]);
            }
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

    public resetPokemonList(): void{
        const pokemonList: PokemonWithImage[] = JSON.parse(sessionStorage.getItem(this.POKEMON_KEY) || '');
        for(let i = 0; i < pokemonList.length; i++){
            pokemonList[i].collected = false;
        }
        this.pokemonWithImg = pokemonList;
        sessionStorage.setItem(this.POKEMON_KEY, JSON.stringify(this.pokemonWithImg));
    }

    public collectPokemon(pokemon: PokemonWithImage, trainer: Trainer | null): void{
        pokemon.collected = true;
        trainer!.pokemon.push(pokemon.pokemon.name);
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