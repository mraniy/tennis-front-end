import {ScoreboardComponent} from './scoreboard.component';
import {Match} from '../model/match';
import {Scoreboardservice} from '../service/scoreboardservice';
import {HttpClient} from '@angular/common/http';
import { of } from 'rxjs';


describe('Component:ScoreboardComponent', () => {
  const SCOREDISPLAYED =  [{
    gamesWonByPlayer1: [
      {
        games: 6
      },
      {
        games: 1
      },
      {
        games: 3
      }
    ],
    gamesWonByPlayer2: [
      {
        games: 4
      },
      {
        games: 6
      },
      {
        games: 6
      }
    ],
    setsWonByPlayer1: [
      1
    ],
    setsWonByPlayer2: [
      2
    ],
    pointsWonByPlayer1: '00',
    pointsWonByPlayer2: '00',
    whoHasTheServe: 'Player1'
  }]
  const SCOREWITHNORMALBREAKPOINTS =  [{
    gamesWonByPlayer1: [
      {
        games: 3
      }
    ],
    gamesWonByPlayer2: [
      {
        games: 4
      }
    ],
    setsWonByPlayer1: [
      0
    ],
    setsWonByPlayer2: [
      0
    ],
    pointsWonByPlayer1: '15',
    pointsWonByPlayer2: '40',
    whoHasTheServe: 'Player1'
  }];
  const SCOREWITHADVBREAKPOINTS =  [{
    gamesWonByPlayer1: [
      {
        games: 3
      }
    ],
    gamesWonByPlayer2: [
      {
        games: 4
      }
    ],
    setsWonByPlayer1: [
      0
    ],
    setsWonByPlayer2: [
      0
    ],
    pointsWonByPlayer1: '40',
    pointsWonByPlayer2: 'AD',
    whoHasTheServe: 'Player1'
  }];
  let component: ScoreboardComponent;
  let mockedScoreBoardService: Scoreboardservice;
  let spy: any;

  beforeEach(() => {
    mockedScoreBoardService = new Scoreboardservice(new HttpClient(null))

    component = new ScoreboardComponent(mockedScoreBoardService);
  });
  afterEach(() => {
    mockedScoreBoardService = null;
    component = null;
  });

  it('should be break points if the player does not have the serve and is at one point to win the game', () => {
    // given
    spy = spyOn(mockedScoreBoardService, 'getMatchWithPointsHistory')
      .and.returnValue(of([]));
    component.match = component.initMatch('federer', 'nadal');
    // when
    const match: Match = component.updateScoreBoard(SCOREWITHNORMALBREAKPOINTS);
    // then

  });

  it('should transform correctly displayed score into match', () => {
    // given
    spy = spyOn(mockedScoreBoardService, 'getMatchWithPointsHistory')
      .and.returnValue(of([]));
    component.match = component.initMatch('federer', 'nadal');
    // when
    const match: Match = component.updateScoreBoard(SCOREDISPLAYED);
    // then
    assertAllFields(match);
  });

  function assertAllFields(match: Match) {
    expect(match.player1.scorePlayer.numberGamesWonByPlayerBySet[0].games).toBe(6);
    expect(match.player1.scorePlayer.numberGamesWonByPlayerBySet[1].games).toBe(1);
    expect(match.player1.scorePlayer.numberGamesWonByPlayerBySet[2].games).toBe(3);
    expect(match.player1.scorePlayer.numberSetWonByPlayer).toBe(1);
    expect(match.player1.scorePlayer.points).toBe('00');
    expect(match.player1.serves).toBeTruthy();
    expect(match.player2.scorePlayer.numberGamesWonByPlayerBySet[0].games).toBe(4);
    expect(match.player2.scorePlayer.numberGamesWonByPlayerBySet[1].games).toBe(6);
    expect(match.player2.scorePlayer.numberGamesWonByPlayerBySet[2].games).toBe(6);
    expect(match.player2.scorePlayer.points).toBe('00');
    expect(match.player2.scorePlayer.numberSetWonByPlayer).toBe(2);
    expect(match.player2.serves).toBeFalsy();
  }
});
