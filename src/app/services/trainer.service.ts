import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Trainer } from "../models/trainer.models";


const TRAINER_KEY ="trainername"
const URL = environment.pokemonAPI;

@Injectable({
    providedIn: 'root'
})
export class TrainersService {
    private _trainers: string = "";
    private _trainer: Trainer | null = null;
    private error: string = '';

    get trainername(): string {
        return this._trainers
    }

    set trainername(trainername: string) {
        localStorage.setItem(TRAINER_KEY, trainername)
        this._trainers = trainername;
    }

    //Session Storage dosent remove the user after refresh
    constructor(private readonly http: HttpClient) { 
        
    }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': "n1ZKh0vT2oxeCvrWBefmxhBLDpFw0bouiHRtG1OjzIgol1Lm2TWdWSIcD4kj8Zic"
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
                .subscribe({
                    next: (response: Trainer) => {
                        this._trainer = response;
                        localStorage.setItem(TRAINER_KEY, JSON.stringify(response));
                        console.log("Logged In", response);
                    },
                });
            }
            else{
                this._trainer = trainer.pop() || null;
                localStorage.setItem(TRAINER_KEY, JSON.stringify(this._trainer));
            }
        }, (error: HttpErrorResponse) =>{
            this.error = error.message;
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

    



    public patchTrainerPokemon(pokemon: string[]){
        this.http.patch('url', {pokemon: pokemon})
    }

}