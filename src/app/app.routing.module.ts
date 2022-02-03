import { Component, NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { CataloguePage } from "./catalogue/catalogue.page";
import { LoginTrainerPage } from "./Login-Trainer/login-trainer.page";

//1. Landing Page
//2. Catalogue Page
//3. Trainer Page


//Route Created to Navigate
const routes: Routes = [

    //if its a empty path redirect to login page as default
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: 'login',
        component: LoginTrainerPage,

    },
    {
        path: 'catalogue',
        component: CataloguePage,
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}