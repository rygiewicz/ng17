import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  concat,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs';
import {
  EMPTY$,
  ERROR$,
  LOADING$,
  Movie,
  RequestState,
  SUCCESS,
} from './imdb.model';
import { adaptMovie, adaptMovieList } from './imdb.adapter';
import { imdbConfig } from './imdb.config';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private baseUrl = imdbConfig.baseUrl;
  private apiKey = imdbConfig.apiKey;

  private phrase$ = new BehaviorSubject('');
  private movieList$ = this.createMovieList$();

  constructor(private http: HttpClient) {}

  private createMovieList$(): Observable<RequestState<Movie[]>> {
    return this.phrase$.pipe(
      distinctUntilChanged(),
      switchMap((phrase) => {
        if (phrase.length < 3) {
          return EMPTY$();
        }

        return concat(LOADING$(), this.fetchMovieList(phrase));
      })
    );
  }

  private fetchMovieList(phrase: string): Observable<RequestState<Movie[]>> {
    return this.http
      .get(`${this.baseUrl}/title/v2/find`, {
        params: {
          title: phrase,
          limit: '20',
          sortArg: 'moviemeter,asc',
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
        },
      })
      .pipe(
        map((response) => {
          return SUCCESS(adaptMovieList(response));
        }),
        catchError((err) => {
          return ERROR$(err.message);
        })
      );
  }

  private fetchMovie(id: string): Observable<RequestState<Movie>> {
    return this.http
      .get(`${this.baseUrl}/title/get-details`, {
        params: {
          tconst: id,
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
        },
      })
      .pipe(
        map((response) => {
          return SUCCESS(adaptMovie(response));
        }),
        catchError((err) => {
          return ERROR$(err.message);
        })
      );
  }

  getMovieList$(): Observable<RequestState<Movie[]>> {
    return this.movieList$;
  }

  getMovie$(id: string): Observable<RequestState<Movie>> {
    return concat(LOADING$(), this.fetchMovie(id));
  }

  setPhrase(phrase: string) {
    this.phrase$.next(phrase);
  }
}
