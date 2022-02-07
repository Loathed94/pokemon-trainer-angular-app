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

    //The method first checks if there is a list of pokemon in sessionStorage, if so it fetches that information to the state and returns.
    //Otherwise it performs a fetch from API and stores the results in this state and in sessionStorage. 
    //Both versions of the method will also iterate over trainer's pokemon and mark those as collected in the list of pokemon stored here.
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

    //A getter that returns all pokemon stored in state.
    public getPokemon(): PokemonWithImage[]{
        return this.pokemonWithImg;
    }

   public pokemonFromMap(pokemonName:string ): PokemonWithImage {
        return this.pokeNameMap!.get(pokemonName) || {pokemon: {name: "", url: ""}, img: "", id: NaN, collected: false };
    }

    //A getter that returns error (not really used, delete?).
    public getError(): string{
        return this.error;
    }

    //A method that resets all pokemon stored in sessionStorage making sure all have collected = false. 
    //Used when login-page is loaded without logged in trainer, new trainer should not automatically receive pokemon from another one.
    public resetPokemonList(): void{
        const pokemonList: PokemonWithImage[] = JSON.parse(sessionStorage.getItem(this.POKEMON_KEY) || '');
        for(let i = 0; i < pokemonList.length; i++){
            pokemonList[i].collected = false;
        }
        this.pokemonWithImg = pokemonList;
        sessionStorage.setItem(this.POKEMON_KEY, JSON.stringify(this.pokemonWithImg));
    }

    //Changes a specific pokemon's collected property to true and adds its name to the trainer objects list of pokemon.
    public collectPokemon(pokemon: PokemonWithImage, trainer: Trainer | null): void{
        pokemon.collected = true;
        trainer!.pokemon.push(pokemon.pokemon.name);
        this.updateStorageAndTrainer();
    }

    //Method updates the list of pokemon stored in sessionStorage, called upon when a pokemon's properties are changed. 
    private updateStorageAndTrainer(): void{
        sessionStorage.setItem('pokemon', JSON.stringify(this.pokemonWithImg));
        //Update trainer locally and on API
    }

    //Uses a pokemon's name as string to mark it as collected using a hashmap that stores the same pokemon objects as the array.
    //Allows for easier access to specific pokemon. Used when a trainer is fetched that already owns some pokemon.
    public collectPokemonWithName(name: string): void {
        const namedPokemon: PokemonWithImage = this.pokeNameMap.get(name) || {pokemon: {name: '', url: ''}, img: '', id: NaN, collected: false};
        namedPokemon.collected = true;
        this.updateStorageAndTrainer();
    }
}