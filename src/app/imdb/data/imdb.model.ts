import { Observable, of } from 'rxjs';

export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface RequestState<T = any> {
  error?: string;
  data?: T;
  loading: boolean;
}

export function EMPTY(): RequestState {
  return {
    loading: false,
  };
}

export function LOADING(): RequestState {
  return {
    loading: true,
  };
}

export function ERROR(error: string): RequestState {
  return {
    error,
    loading: false,
  };
}

export function SUCCESS<T>(data: T): RequestState<T> {
  return {
    data,
    loading: false,
  };
}

export function EMPTY$(): Observable<RequestState> {
  return of(EMPTY());
}

export function LOADING$(): Observable<RequestState> {
  return of(LOADING());
}

export function ERROR$(error: string): Observable<RequestState> {
  return of(ERROR(error));
}

export function SUCCESS$<T>(data: T): Observable<RequestState<T>> {
  return of(SUCCESS(data));
}
