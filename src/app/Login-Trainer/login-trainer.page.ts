import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TrainersService } from '../services/trainer.service';

//Component (decorator) Created for login-trainer
@Component({
    selector: 'app-login-trainer',
    templateUrl: './login-trainer.page.html',
    styleUrls: ['./login-trainer.page.css']
})



//Adds user and checks if form is valid on submit
export class LoginTrainerPage implements OnInit {


    constructor(
        private router: Router,
        private trainerService: TrainersService) { }

    ngOnInit(): void {

    }



    //Checks the trainer and adds to API
    onSubmit(loginForm: NgForm): void {
        const { trainername } = loginForm.value;
        //this.trainerService.trainername = trainername
        this.trainerService.addTrainer(trainername);
        //this.router.navigateByUrl("/catalogue");
        /*.subscribe({
            next: (response: any) => {
                console.log("Logged In", response);
            },
        });*/
    }
}
