import { Component } from "@angular/core";
import { TrainersService } from "../services/trainer.service";



@Component({
    selector: 'app-trainer',
    templateUrl: './trainer.page.html',
    styleUrls: ['./trainer.page.css']
})
export class TrainerPage {
    get trainerName(): string {
        return this.trainerService.trainerName;

    }
    constructor(
        private trainerService: TrainersService
    ) { }

    logOut(){
        localStorage.clear()
    }
}
