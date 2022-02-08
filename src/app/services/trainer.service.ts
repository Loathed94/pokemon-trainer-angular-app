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

    constructor(private readonly http: HttpClient, private router: Router) { }



    //A getter for the trainer's name. 
    get trainerName(): string {
        return this._trainer?.username || '';
    }

    //A getter for the list of pokemon the trainer owns.
    get trainerPokemon(): string [] {
        return this._trainer!.pokemon;
    }

    //A getter for the trainer-object.
    get trainer(): Trainer | null{
        return this._trainer;
    }

    public newTrainerPokemon(pokemon: string[]){
        this._trainer!.pokemon = pokemon;
    }

    //A setter for the service's trainer object.
    public setTrainer(trainer: Trainer | null): void{
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
            console.log("Navigating to ",routing);
            this.router.navigateByUrl(routing);
        }
        )
    }

    //Fetching trainer using the name user input in login page if the trainer exists. Otherwise a trainer is created and posted on the API.
    public getTrainer(trainer: Trainer): Observable<Trainer[]> {
        return this.http.get<Trainer[]>(`${URL}?username=${trainer.username}`);
        /*.subscribe((trainer: Trainer[]) => {
            if(trainer.length === 0){
                const user = {
                    username: username,
                    pokemon: []
                }
            }
            else{
                this._trainer = trainer.pop() || null;
                localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
                this.router.navigateByUrl("/catalogue");
            }
        })*/
    }

    public postTrainer(trainer: Trainer): Observable<Trainer>{
        const headers = this.createHeaders();
        return this.http.post<Trainer>(`${URL}`, {username: trainer.username, pokemon: trainer.pokemon}, {headers});
                /*.subscribe((response: Trainer) => {
                    this._trainer = response;
                    localStorage.setItem(TRAINER_KEY, JSON.stringify(response));
                    this.router.navigateByUrl("/catalogue");
        });*/
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