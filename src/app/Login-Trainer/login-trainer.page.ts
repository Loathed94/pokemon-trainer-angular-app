import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

//Component (decorator) Created for login-trainer
@Component ({ 
    selector: 'app-login-trainer',
    templateUrl: './login-trainer.page.html',
    styleUrls: ['./login-trainer.page.css']
})

//Adds user and checks if form is valid on submit
export class LoginTrainerPage {
    public onSubmit(loginForm: NgForm): void {
        console.log(loginForm.valid);
        
    }
}