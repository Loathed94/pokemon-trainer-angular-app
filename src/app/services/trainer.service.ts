import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Trainer } from "../models/trainer.models";
import { Router } from "@angular/router";


const TRAINER_KEY = environment.trainerItem;
const API_KEY = environment.apiKey;
const URL = environment.pokemonAPI;

@Injectable({
    providedIn: 'root'
})
export class TrainersService {
    private _trainers: string = "";
    private _trainer: Trainer | null = null;
    private error: string = '';

    get trainerName(): string {
        return this._trainer?.username || '';
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
    addTrainer(username: string): void {
        this.http.get<Trainer[]>(`${URL}?username=${username}`)
        .subscribe((trainer: Trainer[]) => {
            if(trainer.length === 0){
                const user = {
                    username: username,
                    pokemon: []
                }
                const headers = this.createHeaders()
                this.http.post<Trainer>(`${URL}?username=${username}`, user, {headers})
                .subscribe((response: Trainer) => {
                        this._trainer = response;
                        localStorage.setItem(TRAINER_KEY, JSON.stringify(response));
                        console.log("Logged In", response);
                    },
                );
            }
            else{
                this._trainer = trainer.pop() || null;
                localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
            }
            this.router.navigateByUrl("/catalogue");
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

    



    public patchTrainerPokemon(pokemon: string[], id: number): void{
        const headers = this.createHeaders();
        this.http.patch(`${URL}/${id}`, {pokemon: pokemon}, {headers})
    }

}