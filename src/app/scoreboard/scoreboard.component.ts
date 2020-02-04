import {Component, OnInit} from '@angular/core';
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

  constructor(private scoreBoardService: Scoreboardservice) {
  }

  ngOnInit() {

    this.match = {};
    this.match.player1 = {};
    this.match.player1.name = 'FEDERER';
    this.match.player1.scorePlayer = {};
    this.match.player1.scorePlayer.numberGamesWonByPlayerBySet = [{}, {}, {}, {}, {}];
    this.match.player2 = {};
    this.match.player2.name = 'NADAL';
    this.match.player2.scorePlayer = {};
    this.match.player2.scorePlayer.numberGamesWonByPlayerBySet = [{}, {}, {}, {}, {}];

    this.scoreBoardService.getMatchWithPointsHistory().subscribe(value => {
      this.scoresDisplayed = value;
      this.fromScoreDisplayedIntoMatch(this.scoresDisplayed);
    });
  }


  fromScoreDisplayedIntoMatch(scoredisplayed: Scoredisplayed[], index: number = 0): Match {
    if (index < 500) {
      index++;
      setTimeout(() => {
        this.updateScoreBoard(scoredisplayed, index);
      }, 100);
    }
    return this.match;
  }

  public updateScoreBoard(scoredisplayed: Scoredisplayed[], index: number = 0): Match {
    for (let i = 0; i < 5; i++) {
      this.transformGamesPlayer1(scoredisplayed[index], i, this.match.player1);
      this.transformGamesPlayer2(scoredisplayed[index], i, this.match.player2);
    }
    this.match.player1.scorePlayer.points = scoredisplayed[index].pointsWonByPlayer1;
    this.match.player2.scorePlayer.points = scoredisplayed[index].pointsWonByPlayer2;
    this.fromScoreDisplayedIntoMatch(scoredisplayed, index);
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
