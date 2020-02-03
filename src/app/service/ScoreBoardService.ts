import {Injectable} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {Match} from '../model/match';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ScoreBoardService {
  constructor(private http: HttpClient) {
  }
  getMatch(): Observable<Match> {
    return this.http.get<Match>('http://localhost:8080/random')
      .pipe(catchError(this.handleError<Match>('getMatch',MATCH)));
  }

  private handleError<T>(opertion = 'operation' , result?: T) {
    return (error: any): Observable<T> => {
      alert(JSON.stringify(error));
      console.error(error);
      return of(result as T);
    };
  }
}

const MATCH = {
  "player1": {
  "name": "Federer",
    "scorePlayer": {
    "numberPointsOfGameWonByPlayer": 0,
      "numberGamesWonByPlayerBySet": [
      {
        "games": 1,
        "tieBreakPoints": null
      },
      {
        "games": 6,
        "tieBreakPoints": null
      },
      {
        "games": 6,
        "tieBreakPoints": null
      }
    ],
      "numberSetWonByPlayer": 2
  }
},
  "player2": {
  "name": "Nadal",
    "scorePlayer": {
    "numberPointsOfGameWonByPlayer": 0,
      "numberGamesWonByPlayerBySet": [
      {
        "games": 6,
        "tieBreakPoints": null
      },
      {
        "games": 0,
        "tieBreakPoints": null
      },
      {
        "games": 3,
        "tieBreakPoints": null
      }
    ],
      "numberSetWonByPlayer": 1
  }
},
  "winner": "Federer",
  "setNumber": 3
}
