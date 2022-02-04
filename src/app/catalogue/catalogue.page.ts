import { Component } from "@angular/core";
import { TrainersService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.page.html',
    styleUrls: ['./catalogue.page.css']
})
export class CataloguePage{

    get trainername(): string {
        return this.trainerService.trainername
    }

    constructor(
        private trainerService: TrainersService
    ) {}
}

