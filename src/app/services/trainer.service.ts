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
    //private _trainers: string = "";
    private _trainer: Trainer | null = null;
    private error: string = '';

    /*ngOnInit(): void {
        if(this._trainer === null && localStorage.getItem(TRAINER_KEY) !== null){
            console.log("OnInit Trainer")
            this._trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || '');
        }
    }*/

    public updateTrainerFromStorage(): void{
        if(localStorage.getItem(TRAINER_KEY) !== null){
            console.log("OnInit Trainer")
            this._trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || '');
        }
    }

    public updateTrainerInStorage(): void{
        localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
    }

    get trainerName(): string {
        return this._trainer?.username || '';
    }

    get trainer(): Trainer | null{
        return this._trainer;
    }

    public setTrainer(trainer: Trainer): void{
        this._trainer = trainer;
    }

    //Session Storage dosent remove the user after refresh
    constructor(private readonly http: HttpClient, private router: Router) { 
        
    }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': API_KEY
        })
    }

    ///Add/Create new user to API
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
        /*const user = {
            username: username,
            pokemon: []
        }
        const headers = this.createHeaders()
        
        return this.http.post(URL + "", user, {
            headers

        })*/
    }

    
    public addPokemonToTrainer(pokemon: PokemonWithImage):void{
        this._trainer?.pokemon.push(pokemon.pokemon.name);
    }


    public patchTrainerPokemon(): void{
        const headers = this.createHeaders();
        this.http.patch<Trainer>(`${URL}/${this._trainer?.id}`, {pokemon: this._trainer?.pokemon}, {headers})
        .subscribe((response: Trainer) => {
            //this._trainer = response;
            localStorage.setItem(TRAINER_KEY, JSON.stringify(response));
        });
    }

}