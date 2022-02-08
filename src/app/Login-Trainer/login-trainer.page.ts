import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Trainer } from '../models/trainer.models';
import { PokemonService } from '../services/pokemon.services';
import { TrainersService } from '../services/trainer.service';


const TRAINER_KEY = environment.trainerItem;
const POKEMON_KEY = environment.pokemonItem;
@Component({
    selector: 'app-login-trainer',
    templateUrl: './login-trainer.page.html',
    styleUrls: ['./login-trainer.page.css']
})
export class LoginTrainerPage implements OnInit {

    constructor(
        private actRoute: ActivatedRoute,
        private trainerService: TrainersService,
        private pokemonService: PokemonService) { }


    //When login-page is initialized an if-check is performed to act as a sort of reversed auth-guard, if a trainer is available in localStorage then the state is set as that trainer and router sends the user to catalogue-page.
    //Additionally the the API is consulted to make sure the trainer still exists there, if not the trainer is created on API with its properties and a new ID is returned and saved locally and in state.
    //If login-page was navigated to with a parameter with the name of a different page login-page will act as a trainer verification where steps described above will be performed and navigation back to previous page will be performed.
    //If there is no trainer logged in already but pokemon exist in sessionStorage then the list of pokemon is reset so that all pokemon start off being uncollected before a new trainer is logged in.
    ngOnInit(): void {
        if(localStorage.getItem(TRAINER_KEY)){
            const reroute: string = this.actRoute.snapshot.params["reroute"];
            const storedTrainer: Trainer = JSON.parse(localStorage.getItem(TRAINER_KEY) || '');
            let routing: string = '/';
            if(reroute.length === 0){
                routing += 'catalogue';
            }
            else{
                routing += reroute;
            }
            this.trainerService.loginTrainer(storedTrainer, routing);
        }
        else if(sessionStorage.getItem(POKEMON_KEY) !== null){
            this.pokemonService.resetPokemonList();
        }
    }

    //Method receives information from the NgForm, specifically a username, and sends it along to the trainerService to log in or register the new trainer.
    onSubmit(loginForm: NgForm): void {
        const { trainerName } = loginForm.value;
        const emptyTrainer: Trainer = {username: trainerName, id: -1, pokemon: []};
        this.trainerService.loginTrainer(emptyTrainer, '/catalogue');
    }
}
