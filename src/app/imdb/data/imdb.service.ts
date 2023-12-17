import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  concat,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';
import {
  MovieListState,
  MOVIES_EMPTY,
  MOVIES_ERROR,
  MOVIES_LOADING,
  MOVIES_SUCCESS,
} from './imdb.model';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private baseUrl = 'https://imdb8.p.rapidapi.com';
  private phrase$ = new BehaviorSubject('');
  private movieList$ = this.createMovieList$();

  constructor(private http: HttpClient) {}

  private createMovieList$(): Observable<MovieListState> {
    return this.phrase$.pipe(
      distinctUntilChanged(),
      switchMap((phrase) => {
        if (phrase.length < 3) {
          return MOVIES_EMPTY;
        }

        return concat(MOVIES_LOADING, this.fetchMovies(phrase));
      })
    );
  }

  private fetchMovies(phrase: string): Observable<MovieListState> {
    return this.http.get(`${this.baseUrl}/title/v2/find`, {}).pipe(
      map((response) => {
        return MOVIES_SUCCESS([]);
      }),
      catchError((err) => {
        return MOVIES_ERROR(err.message);
      })
    );
  }

  getMovies$(): Observable<MovieListState> {
    return this.movieList$;
  }

  setPhrase(phrase: string) {
    this.phrase$.next(phrase);
  }
}
