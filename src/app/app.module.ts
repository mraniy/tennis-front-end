import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import {HttpClientModule} from '@angular/common/http';
import {Scoreboardservice} from './service/scoreboardservice';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    Scoreboardservice
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
