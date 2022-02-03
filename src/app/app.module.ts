import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { LoginTrainerPage } from './login-trainer/login-trainer.page';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginTrainerPage
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
