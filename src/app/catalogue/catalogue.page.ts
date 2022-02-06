import { Component } from "@angular/core";
import { Trainer } from "../models/trainer.models";
import { TrainersService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.page.html',
    styleUrls: ['./catalogue.page.css']
})
export class CataloguePage{

    get trainerName(): string {
        if(this.trainerService.trainerName.length < 1){
            this.trainerService.updateTrainerFromStorage();
        }
        return this.trainerService.trainerName;
    }

    get trainer(): Trainer | null{
        return this.trainerService.trainer;
    }

    constructor(
        private trainerService: TrainersService
    ) {}
}

