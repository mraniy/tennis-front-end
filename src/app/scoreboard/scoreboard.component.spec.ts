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
    pointsWonByPlayer2: '00'
  }]
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
    expect(match.player2.scorePlayer.numberGamesWonByPlayerBySet[0].games).toBe(4);
    expect(match.player2.scorePlayer.numberGamesWonByPlayerBySet[1].games).toBe(6);
    expect(match.player2.scorePlayer.numberGamesWonByPlayerBySet[2].games).toBe(6);
    expect(match.player2.scorePlayer.points).toBe('00');
    expect(match.player2.scorePlayer.numberSetWonByPlayer).toBe(2);
  }
});
