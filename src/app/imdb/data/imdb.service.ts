import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
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
import { adaptMovie, adaptMovieDetails, adaptMovieList } from './imdb.adapter';
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

  private fetchMovie(id: string) {
    return this.http.get(`${this.baseUrl}/title/get-details`, {
      params: {
        tconst: id,
      },
      headers: {
        'X-RapidAPI-Key': this.apiKey,
      },
    });
  }

  private fetchSynopsis(id: string) {
    return this.http.get(`${this.baseUrl}/title/get-synopses`, {
      params: {
        tconst: id,
      },
      headers: {
        'X-RapidAPI-Key': this.apiKey,
      },
    });
  }

  private fetchMovieDetailed(id: string): Observable<RequestState<Movie>> {
    return combineLatest([this.fetchMovie(id), this.fetchSynopsis(id)]).pipe(
      map(([movieResponse, synopsisResponse]) => {
        return SUCCESS(adaptMovieDetails(movieResponse, synopsisResponse));
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
    return concat(LOADING$(), this.fetchMovieDetailed(id));
  }

  setPhrase(phrase: string) {
    this.phrase$.next(phrase);
  }
}
