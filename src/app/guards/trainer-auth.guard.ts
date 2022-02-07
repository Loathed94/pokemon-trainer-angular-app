import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CataloguePage } from '../catalogue/catalogue.page';
import { TrainersService } from '../services/trainer.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerAuthGuard implements CanActivate {
  private TRAINER_KEY = environment.trainerItem;
  constructor (
    private router: Router
   ) {

   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (localStorage.getItem(this.TRAINER_KEY) !== null) {
      return true;
    }
    else {
      //also redirect
      this.router.navigateByUrl("/") //Login
      return false;
    }
    
  }
  
}
