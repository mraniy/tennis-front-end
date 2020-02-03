import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import {HttpClientModule} from '@angular/common/http';
import {ScoreBoardService} from './service/ScoreBoardService';

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
    ScoreBoardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
