import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const TRAINER_KEY ="trainername"
const URL = environment.pokemonAPI;

@Injectable({
    providedIn: 'root'
})
export class TrainersService {
    private _trainers: string = "";

    get trainername(): string {
        return this._trainers
    }

    set trainername(trainername: string) {
        localStorage.setItem(TRAINER_KEY, trainername)
        this._trainers = trainername;
    }

    //Session Storage dosent remove the user after refresh
    constructor(private readonly http: HttpClient) {
        this._trainers= localStorage.getItem(TRAINER_KEY) || "";
        
    }

    private createHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'x-api-key': "n1ZKh0vT2oxeCvrWBefmxhBLDpFw0bouiHRtG1OjzIgol1Lm2TWdWSIcD4kj8Zic"
        })
    }

    ///Add/Create new user to API
    addTrainer(username: string): Observable<any> {
        const user = {
            username: username,
            pokemon: []
        }
        const headers = this.createHeaders()
        
        return this.http.post(URL + "", user, {
            headers

        })
    }

    

}