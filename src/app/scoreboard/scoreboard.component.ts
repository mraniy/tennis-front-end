import {Component, Input, OnInit} from '@angular/core';
import {Scoreboardservice} from '../service/scoreboardservice';
import {Match} from '../model/match';
import {Scoredisplayed} from '../model/scoredisplayed';


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  match: Match;
  scoresDisplayed: Scoredisplayed[];
  @Input() player1Name: string;
  @Input() player2Name: string;
  @Input() updateInterval: number;

  constructor(private scoreBoardService: Scoreboardservice) {
  }

  ngOnInit() {
    this.match = this.initMatch(this.player1Name, this.player2Name);
    this.scoreBoardService.getMatchWithPointsHistory(this.player1Name,this.player2Name).subscribe(value => {
      this.scoresDisplayed = value;
      this.fromScoreDisplayedIntoMatch(this.scoresDisplayed);
    });
  }


  public initMatch(player1Name , player2Name): Match {
    let match: Match;
    match = {};
    match.player1 = {};
    match.player1.name = player1Name;
    match.player1.scorePlayer = {};
    match.player1.scorePlayer.numberSetWonByPlayer = 0;
    match.player1.serves = true;
    match.player1.scorePlayer.numberGamesWonByPlayerBySet = [{games: 0}, {games: 0}, {games: 0}, {games: 0}, {games: 0}];
    match.player2 = {};
    match.player2.name = player2Name;
    match.player2.scorePlayer = {};
    match.player2.scorePlayer.numberSetWonByPlayer = 0;
    match.player2.serves = false;
    match.player2.scorePlayer.numberGamesWonByPlayerBySet = [{games: 0}, {games: 0}, {games: 0}, {games: 0}, {games: 0}];
    return match;
  }

  fromScoreDisplayedIntoMatch(scoredisplayeds: Scoredisplayed[], index: number = 0): Match {
    if (index < scoredisplayeds.length) {
      index++;
      setTimeout(() => {
        this.updateScoreBoard(scoredisplayeds, index);
      }, this.updateInterval);
    }
    return this.match;
  }



  public updateScoreBoard(scoresdisplayed: Scoredisplayed[], index: number = 0): Match {
    const MAX_NUMBER_OF_SET = 5;
    for (let i = 0; i < MAX_NUMBER_OF_SET; i++) {
      this.transformGamesPlayer1(scoresdisplayed[index], i, this.match.player1);
      this.transformGamesPlayer2(scoresdisplayed[index], i, this.match.player2);
    }
    this.match.player1.serves = scoresdisplayed[index].whoHasTheServe === 'Player1';
    this.match.player1.scorePlayer.points = scoresdisplayed[index].pointsWonByPlayer1;
    this.match.player2.scorePlayer.points = scoresdisplayed[index].pointsWonByPlayer2;
    this.match.player1.scorePlayer.numberSetWonByPlayer = scoresdisplayed[index].setsWonByPlayer1[0];
    this.match.player2.scorePlayer.numberSetWonByPlayer = scoresdisplayed[index].setsWonByPlayer2[0];
    this.match.player2.serves = scoresdisplayed[index].whoHasTheServe === 'Player2';
    this.fromScoreDisplayedIntoMatch(scoresdisplayed, index);
    return this.match;
  }

  private transformGamesPlayer1(scoredisplayed: Scoredisplayed, position: number, player) {
    if (scoredisplayed.gamesWonByPlayer1[position] && scoredisplayed.gamesWonByPlayer1[position].games) {
      player.scorePlayer.numberGamesWonByPlayerBySet[position].games =
        scoredisplayed.gamesWonByPlayer1[position].games;
    }
  }

  private transformGamesPlayer2(scoredisplayed: Scoredisplayed, position: number, player) {
    if (scoredisplayed.gamesWonByPlayer2[position] && scoredisplayed.gamesWonByPlayer2[position].games) {
      player.scorePlayer.numberGamesWonByPlayerBySet[position].games =
        scoredisplayed.gamesWonByPlayer2[position].games;
    }
  }
}
