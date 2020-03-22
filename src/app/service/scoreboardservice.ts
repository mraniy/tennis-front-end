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

    return this.http.get<Scoredisplayed[]>('http://ec2-18-191-36-130.us-east-2.compute.amazonaws.com/randomWithHistory')
      .pipe(catchError(this.handleError<Scoredisplayed[]>('getMatchWithPointsHistory', [])));
  }

  private handleError<T>(opertion = 'operation' , result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
