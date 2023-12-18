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
import { Movie } from './imdb.model';
import {
  RS_EMPTY$,
  RS_ERROR$,
  RS_LOADING$,
  RequestState,
  RS_SUCCESS,
} from '../../request.model';
import {
  adaptAutocomplete,
  adaptMovieDetails,
  adaptMovieList,
} from './imdb.adapter';
import { imdbConfig } from './imdb.config';
import { AutocompleteItem } from '../search/data/search.model';

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
          return RS_EMPTY$();
        }

        return concat(RS_LOADING$(), this.fetchMovieList(phrase));
      })
    );
  }

  private createAutocompleteList$(): Observable<
    RequestState<AutocompleteItem[]>
  > {
    return this.autocompletePhrase$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((phrase) => {
        if (phrase.length < 3) {
          return RS_EMPTY$();
        }

        return concat(RS_LOADING$(), this.fetchAutocomplete(phrase));
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
          return RS_SUCCESS(adaptMovieList(response));
        }),
        catchError((err) => {
          return RS_ERROR$(err.message);
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
        return RS_SUCCESS(adaptMovieDetails(movieResponse, synopsisResponse));
      }),
      catchError((err) => {
        return RS_ERROR$(err.message);
      })
    );
  }

  private fetchAutocomplete(
    phrase: string
  ): Observable<RequestState<AutocompleteItem[]>> {
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
        map((response) => {
          return RS_SUCCESS(adaptAutocomplete(response));
        }),
        catchError((err) => {
          return RS_ERROR$(err.message);
        })
      );
  }

  getAutocompleteList$(): Observable<RequestState<AutocompleteItem[]>> {
    return this.autocompleteList$;
  }

  getMovieList$(): Observable<RequestState<Movie[]>> {
    return this.movieList$;
  }

  getMovie$(id: string): Observable<RequestState<Movie>> {
    return concat(RS_LOADING$(), this.fetchMovieDetailed(id));
  }

  setSearchPhrase(phrase: string) {
    this.searchPhrase$.next(phrase);
  }

  setAutocompletePhrase(phrase: string) {
    this.autocompletePhrase$.next(phrase);
  }
}
