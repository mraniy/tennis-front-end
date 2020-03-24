import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Scoredisplayed} from '../model/scoredisplayed';

@Injectable()
export class Scoreboardservice {
  constructor(private http: HttpClient) {
  }
  public getMatchWithPointsHistory(player1Name: string, player2Name: string): Observable<Scoredisplayed[]> {
    const headers = new Headers();
    const params = new HttpParams()
      .set('player1', player1Name)
      .set('player2', player2Name);

    return this.http.get<Scoredisplayed[]>('http://localhost:9008/randomWithHistory', {params})
      .pipe(catchError(this.handleError<Scoredisplayed[]>('getMatchWithPointsHistory', [])));
  }

  private handleError<T>(opertion = 'operation' , result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
