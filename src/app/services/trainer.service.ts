import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const TRAINER_KEY ="trainername"

@Injectable({
    providedIn: 'root'
})
export class TrainersService {
    private _trainers: string = "";

    get trainername(): string {
        return this._trainers
    }

    set trainername(trainername: string) {
        sessionStorage.setItem(TRAINER_KEY, trainername)
        this._trainers = trainername;
    }

    constructor(private readonly http: HttpClient) {

    }

}