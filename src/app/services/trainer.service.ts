import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Trainer } from "../models/trainer.models";
import { Router } from "@angular/router";
import { PokemonWithImage } from "../models/pokemon.models";


const TRAINER_KEY = environment.trainerItem;
const API_KEY = environment.apiKey;
const URL = environment.pokemonAPI;

@Injectable({
    providedIn: 'root'
})
export class TrainersService{
    private _trainer: Trainer | null = null;
    //private error: string = '';

    //If a page is refreshed while there is a trainer in storage the service will need to refresh its own variable of the trainer.
    public updateTrainerFromStorage(): void{
        if(localStorage.getItem(TRAINER_KEY) !== null){
            this._trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || '');
        }
    }

    //Updates or sets the trainer in localStorage, mainly called when a trainer is updated, for example getting a new pokemon.
    public updateTrainerInStorage(): void{
        localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
    }

    //A getter for the trainer's name. 
    get trainerName(): string {
        return this._trainer?.username || '';
    }

    //A getter for the trainer-object.
    get trainer(): Trainer | null{
        return this._trainer;
    }

    //A setter for the service's trainer object.
    public setTrainer(trainer: Trainer): void{
        this._trainer = trainer;
    }

    constructor(private readonly http: HttpClient, private router: Router) { 
        
    }

    //Creates a header needed for POST/PATCH api-calls.
    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        })
    }

    //Fetching trainer using the name user input in login page if the trainer exists. Otherwise a trainer is created and posted on the API.
    public addTrainer(username: string): void {
        this.http.get<Trainer[]>(`${URL}?username=${username}`)
        .subscribe((trainer: Trainer[]) => {
            if(trainer.length === 0){
                const user = {
                    username: username,
                    pokemon: []
                }
                const headers = this.createHeaders()
                this.http.post<Trainer>(`${URL}`, user, {headers})
                .subscribe((response: Trainer) => {
                    this._trainer = response;
                    localStorage.setItem(TRAINER_KEY, JSON.stringify(response));
                    this.router.navigateByUrl("/catalogue");
                });
            }
            else{
                this._trainer = trainer.pop() || null;
                localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
                this.router.navigateByUrl("/catalogue");
            }
        })
    }

    //When a pokemon is collected this method is called, it adds a pokemon name to the list of pokemon names that the trainer possesses.
    public addPokemonToTrainer(pokemon: PokemonWithImage):void{
        this._trainer?.pokemon.push(pokemon.pokemon.name);
    }

    //A HTTP-patch call that updates the trainer on the API with its list of pokemon.
    public patchTrainerPokemon(): void{
        const headers = this.createHeaders();
        this.http.patch<Trainer>(`${URL}/${this._trainer?.id}`, {pokemon: this._trainer?.pokemon}, {headers})
        .subscribe((response: Trainer) => {
            localStorage.setItem(TRAINER_KEY, JSON.stringify(response));
        });
    }

}