import { Observable, of } from 'rxjs';

export interface Movie {
  title: string;
}

export interface MovieListState {
  error: string;
  data: Movie[];
  loading: boolean;
}

export const MOVIES_EMPTY: MovieListState = {
  error: '',
  data: [],
  loading: false,
};

export const MOVIES_LOADING: MovieListState = {
  error: '',
  data: [],
  loading: true,
};

export const MOVIES_ERROR = (error: string): MovieListState => ({
  error,
  data: [],
  loading: false,
});

export const MOVIES_SUCCESS = (data: Movie[]): MovieListState => ({
  error: '',
  data,
  loading: false,
});

export const MOVIES_EMPTY$: Observable<MovieListState> = of(MOVIES_EMPTY);

export const MOVIES_LOADING$: Observable<MovieListState> = of(MOVIES_LOADING);

export const MOVIES_ERROR$ = (error: string): Observable<MovieListState> =>
  of(MOVIES_ERROR(error));
