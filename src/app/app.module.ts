import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { CataloguePokemonListItemComponent } from './catalogue-pokemon-list-item/catalogue-pokemon-list-item.component';
import { CataloguePokemonListComponent } from './catalogue-pokemon-list/catalogue-pokemon-list.component';
import { CataloguePage } from './catalogue/catalogue.page';
import { LoginTrainerPage } from './Login-Trainer/login-trainer.page';

@NgModule({
  declarations: [
    AppComponent,
    LoginTrainerPage,
    CataloguePage,
    CataloguePokemonListComponent,
    CataloguePokemonListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
