import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Trainer } from "../models/trainer.models";
import { Router } from "@angular/router";
import { PokemonWithImage } from "../models/pokemon.models";
import { Observable, of, switchMap } from "rxjs";


const TRAINER_KEY = environment.trainerItem;
const API_KEY = environment.apiKey;
const URL = environment.pokemonAPI;

@Injectable({
    providedIn: 'root'
})
export class TrainersService{
    private _trainer: Trainer | null = null;
    //private error: string = '';


    constructor(private readonly http: HttpClient, private router: Router) { }

    //If a page is refreshed while there is a trainer in storage the service will need to refresh its own variable of the trainer.
    /*public updateTrainerFromStorage(): void{
        if(localStorage.getItem(TRAINER_KEY) !== null){
            this._trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || '');
        }
    }*/

    //Updates or sets the trainer in localStorage, mainly called when a trainer is updated, for example getting a new pokemon.
    /*public updateTrainerInStorage(): void{
        localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
    }*/

    //A getter for the trainer's name. 
    get trainerName(): string {
        return this._trainer?.username || '';
    }

    get trainerPokemon(): string [] {
        return this._trainer!.pokemon;
    }

    //A getter for the trainer-object.
    get trainer(): Trainer | null{
        return this._trainer;
    }

    //Receives a list of pokemon and replaces the existing list with the new one.
    public newTrainerPokemon(pokemon: string[]){
        this._trainer!.pokemon = pokemon;
    }

    //A setter for the service's trainer object.
    public setTrainer(trainer: Trainer): void{
        this._trainer = trainer;
    }

    //Creates a header needed for POST/PATCH api-calls.
    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        })
    }

    //A method specifically used to login (or register) or verify the existence of a user on the API that is stored on localStorage (if API has deleted the user they will be re-added with their pokemon but with new id).
    //Get-call is made first, if trainer is not retrieved from there a post-call is made creating the trainer on the API. After method is run the new trainer is set in state and in localStorage.
    public loginTrainer(trainer: Trainer, routing: string): void{
        this.getTrainer(trainer)
        .pipe(
            switchMap((trainers: Trainer[]) => {
                if(trainers.length > 0){
                    return of(trainers[0]);
                }
                else{
                    return this.postTrainer(trainer);
                }
            })
        )
        .subscribe((trainer: Trainer) => {
            this.setTrainer(trainer);
            localStorage.setItem(TRAINER_KEY, JSON.stringify(trainer));
            this.router.navigateByUrl(routing);
        }
        )
    }

    //Fetching trainer using the name user input in login page if the trainer exists. Otherwise a trainer is created and posted on the API.
    public getTrainer(trainer: Trainer): Observable<Trainer[]> {
        return this.http.get<Trainer[]>(`${URL}?username=${trainer.username}`);
    }

    //Performs a post-request to API with the trainer-information relevant.
    public postTrainer(trainer: Trainer): Observable<Trainer>{
        const headers = this.createHeaders();
        return this.http.post<Trainer>(`${URL}`, {username: trainer.username, pokemon: trainer.pokemon}, {headers});
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