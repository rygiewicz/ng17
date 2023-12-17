import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  concat,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
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
import {
  adaptAutocomplete,
  adaptMovieDetails,
  adaptMovieList,
} from './imdb.adapter';
import { imdbConfig } from './imdb.config';

@Injectable({
  providedIn: 'root',
})
export class ImdbService {
  private baseUrl = imdbConfig.baseUrl;
  private apiKey = imdbConfig.apiKey;

  private searchPhrase$ = new BehaviorSubject('');
  private autocompletePhrase$ = new BehaviorSubject('');
  private movieList$ = this.createMovieList$();
  private autocompleteList$ = this.createAutocompleteList$();

  constructor(private http: HttpClient) {}

  private createMovieList$(): Observable<RequestState<Movie[]>> {
    return this.searchPhrase$.pipe(
      distinctUntilChanged(),
      switchMap((phrase) => {
        if (phrase.length < 3) {
          return EMPTY$();
        }

        return concat(LOADING$(), this.fetchMovieList(phrase));
      })
    );
  }

  private createAutocompleteList$(): Observable<Movie[]> {
    return this.autocompletePhrase$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((phrase) => this.fetchAutocomplete(phrase))
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

  private fetchAutocomplete(phrase: string): Observable<Movie[]> {
    return this.http
      .get(`${this.baseUrl}/auto-complete`, {
        params: {
          q: phrase,
        },
        headers: {
          'X-RapidAPI-Key': this.apiKey,
        },
      })
      .pipe(
        map((response) => adaptAutocomplete(response)),
        catchError(() => of([]))
      );
  }

  getAutocompleteList$(): Observable<Movie[]> {
    return this.autocompleteList$;
  }

  getMovieList$(): Observable<RequestState<Movie[]>> {
    return this.movieList$;
  }

  getMovie$(id: string): Observable<RequestState<Movie>> {
    return concat(LOADING$(), this.fetchMovieDetailed(id));
  }

  setSearchPhrase(phrase: string) {
    this.searchPhrase$.next(phrase);
  }

  setAutocompletePhrase(phrase: string) {
    this.autocompletePhrase$.next(phrase);
  }
}
