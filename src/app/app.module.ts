import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import {HttpClientModule} from '@angular/common/http';
import {Scoreboardservice} from './service/scoreboardservice';
import { ScoreboardGeneratorComponent } from './scoreboard-generator/scoreboard-generator.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    ScoreboardGeneratorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    Scoreboardservice
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
