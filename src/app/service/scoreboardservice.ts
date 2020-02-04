import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Scoredisplayed} from '../model/scoredisplayed';

@Injectable()
export class Scoreboardservice {
  constructor(private http: HttpClient) {
  }
  public getMatchWithPointsHistory(): Observable<Scoredisplayed[]> {

    return this.http.get<Scoredisplayed[]>('http://localhost:8080/randomWithHistory')
      .pipe(catchError(this.handleError<Scoredisplayed[]>('getMatchWithPointsHistory', [])));
  }

  private handleError<T>(opertion = 'operation' , result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
