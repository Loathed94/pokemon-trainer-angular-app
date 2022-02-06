import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.models';
import { PokemonService } from '../services/pokemon.services';
import { TrainersService } from '../services/trainer.service';

//Component (decorator) Created for login-trainer

const TRAINER_KEY = environment.trainerItem;
const POKEMON_KEY = environment.pokemonItem;
@Component({
    selector: 'app-login-trainer',
    templateUrl: './login-trainer.page.html',
    styleUrls: ['./login-trainer.page.css']
})



//Adds user and checks if form is valid on submit
export class LoginTrainerPage implements OnInit {


    constructor(
        private router: Router,
        private trainerService: TrainersService,
        private pokemonService: PokemonService) { }

    ngOnInit(): void {
        if(localStorage.getItem(TRAINER_KEY)){
            const storedTrainer: Trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || '');
            this.trainerService.setTrainer(storedTrainer);
            this.router.navigateByUrl("/catalogue");
        }
        else if(sessionStorage.getItem(POKEMON_KEY) !== null){
            this.pokemonService.resetPokemonList();
        }
    }

    //Checks the trainer and adds to API
    onSubmit(loginForm: NgForm): void {
        const { trainerName } = loginForm.value;
        this.trainerService.addTrainer(trainerName);
    }
}
