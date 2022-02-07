import { Component } from "@angular/core";
import { Trainer } from "../models/trainer.models";
import { TrainersService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.page.html',
    styleUrls: ['./catalogue.page.css']
})
export class CataloguePage{

    //A getter used by html to present trainer name on the page. 
    //If the trainerService hasn't loaded the trainer from localStorage (if for example a user refreshes catalogue-page) then this method calls an update-method within the service.
    get trainerName(): string {
        if(this.trainerService.trainerName.length < 1){
            this.trainerService.updateTrainerFromStorage();
        }
        return this.trainerService.trainerName;
    }

    //A getter for the Trainer-object from trainerService.
    get trainer(): Trainer | null{
        return this.trainerService.trainer;
    }

    constructor(
        private trainerService: TrainersService
    ) {}
}

