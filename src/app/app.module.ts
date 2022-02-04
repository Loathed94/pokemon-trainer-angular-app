import { Injectable, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';

import { CataloguePokemonListItemComponent } from './catalogue-pokemon-list-item/catalogue-pokemon-list-item.component';
import { CataloguePokemonListComponent } from './catalogue-pokemon-list/catalogue-pokemon-list.component';
import { CataloguePage } from './catalogue/catalogue.page';
import { LoginTrainerPage } from './Login-Trainer/login-trainer.page';
import { AppComponent } from './app.component';


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
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
