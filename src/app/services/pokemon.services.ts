import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Pokemon, PokemonRawData, PokemonWithImage } from "../models/pokemon.models";
import { Trainer } from "../models/trainer.models";

@Injectable({
    providedIn: 'root'
})
export class PokemonService{
    private pokemonWithImg: PokemonWithImage[] = [];
    public pokeNameMap: Map<string, PokemonWithImage> = new Map();
    private POKEMON_KEY = environment.pokemonItem;
    private AVATAR_KEY = environment.pokemonAvatar;
    private POKEMON_URL = environment.pokemonURL;

    constructor(private readonly http: HttpClient){

    }




    public clearPokemon(): void{
        this.pokemonWithImg = [];
    }
    //This method populates the list of pokemon in this service/state by using one of two other methods depending on the situation.
    //Both called methods will also iterate over trainer's pokemon and mark those as collected in the list of pokemon stored here.
    public populatePokemon(trainer: Trainer | null): void{
        if(sessionStorage.getItem(this.POKEMON_KEY) !== null){
            this.setPokemonFromStorage(trainer);
        }
        else{
            this.fetchPokemon(trainer);
        }
    }

    //The method first checks if there is a list of pokemon in sessionStorage, if so it fetches that information to the state and returns.
    private setPokemonFromStorage(trainer: Trainer | null): void{
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

    //This method performs a fetch from API and stores the results in this state and in sessionStorage. 
    private fetchPokemon(trainer: Trainer | null): void{
        this.http.get<PokemonRawData>(this.POKEMON_URL)
        .subscribe((pokemonRaw: PokemonRawData) => {
            const pokemon: Pokemon[] = pokemonRaw.results;
            for(let i = 0; i < pokemon.length; i++){
                const pokeImgURL: string[] = pokemon[i].url.split('/');
                const newPokemon: PokemonWithImage = {pokemon: pokemon[i], img: `${this.AVATAR_KEY}${pokeImgURL[pokeImgURL.length-2]}.png`, id: parseInt(pokeImgURL[pokeImgURL.length-2]), collected: false};
                this.pokemonWithImg.push(newPokemon);
                this.pokeNameMap.set(newPokemon.pokemon.name, newPokemon);
            }
            sessionStorage.setItem(this.POKEMON_KEY, JSON.stringify(this.pokemonWithImg));
            for(let i = 0; i < trainer!.pokemon.length; i++){
                this.collectPokemonWithName(trainer!.pokemon[i]);
            }
        },)
    }

    //A getter that returns all pokemon stored in state.
    public getPokemon(): PokemonWithImage[]{
        return this.pokemonWithImg;
    }

    //A pokemon name is received and used to get a pokemon out of the hashmap which is then returned. 
    public pokemonFromMap(pokemonName:string ): PokemonWithImage {
        return this.pokeNameMap!.get(pokemonName) || {pokemon: {name: "", url: ""}, img: "", id: NaN, collected: false };
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
        this.updatePokemonStorage();
    }

    //Method updates the list of pokemon stored in sessionStorage, called upon when a pokemon's properties are changed. 
    public updatePokemonStorage(): void{
        sessionStorage.setItem(this.POKEMON_KEY, JSON.stringify(this.pokemonWithImg));
    }

    //Uses a pokemon's name as string to mark it as collected using a hashmap that stores the same pokemon objects as the array.
    //Allows for easier access to specific pokemon. Used when a trainer is fetched that already owns some pokemon.
    public collectPokemonWithName(name: string): void {
        const namedPokemon: PokemonWithImage = this.pokeNameMap.get(name) || {pokemon: {name: '', url: ''}, img: '', id: NaN, collected: false};
        namedPokemon.collected = true;
        this.updatePokemonStorage();
    }
}