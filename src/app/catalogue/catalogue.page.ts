import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Trainer } from "../models/trainer.models";
import { TrainersService } from "../services/trainer.service";

@Component({
    selector: 'app-catalogue',
    templateUrl: './catalogue.page.html',
    styleUrls: ['./catalogue.page.css']
})
export class CataloguePage {

    //A getter used by html to present trainer name on the page. 
    get trainerName(): string {
        return this.trainerService.trainerName;
    }

    //A getter for the Trainer-object from trainerService.
    get trainer(): Trainer | null{
        return this.trainerService.trainer;
    }

    constructor(
        private router: Router,
        private trainerService: TrainersService
    ) { }

    logOut() {
        localStorage.clear();
        this.router.navigateByUrl('/login/trainer');
    }
}

