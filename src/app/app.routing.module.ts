import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CataloguePage } from "./catalogue/catalogue.page";
import { TrainerAuthGuard } from "./guards/trainer-auth.guard";
import { LoginTrainerPage } from "./login-trainer/login-trainer.page";
import { TrainerPage } from "./trainer/trainer.page";



//1. Landing Page
//2. Catalogue Page
//3. Trainer Page


//Route Created to Navigate
const routes: Routes = [

    //if its a empty path redirect to login page as default
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login/'
    },
    {
        path: 'login',
        pathMatch: 'full',
        redirectTo: '/login/'
    },
    {
        path: 'login/:reroute',
        component: LoginTrainerPage,
    },
    {
        path: 'catalogue',
        component: CataloguePage,
        canActivate: [ TrainerAuthGuard ]
    },
    {
        path: 'trainer',
        component: TrainerPage,
        canActivate: [ TrainerAuthGuard ]
    }

]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule{}