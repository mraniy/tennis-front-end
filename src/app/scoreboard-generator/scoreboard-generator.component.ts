import { Component, OnInit } from '@angular/core';
import {MatchInfos} from '../model/matchinfos';

@Component({
  selector: 'app-scoreboard-generator',
  templateUrl: './scoreboard-generator.component.html',
  styleUrls: ['./scoreboard-generator.component.css']
})
export class ScoreboardGeneratorComponent implements OnInit {

  constructor() { }
  player2: string;
  player1: string;
  interval: number;
  matchsInfos: MatchInfos[] = [];



  ngOnInit() {

  }

  generateScoreBoard() {
    const matchInfos = this.fillMatchInfos();
    this.matchsInfos.push(matchInfos);
    this.initPlayersInfos();
  }

  private initPlayersInfos() {
    this.interval = undefined;
    this.player1 = '';
    this.player2 = '';
  }

  private fillMatchInfos() {
    const matchInfos: MatchInfos = new MatchInfos();
    matchInfos.interval = this.interval;
    matchInfos.player1Name = this.player1;
    matchInfos.player2Name = this.player2;
    return matchInfos;
  }
}
