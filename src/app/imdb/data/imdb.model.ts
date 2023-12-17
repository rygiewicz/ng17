import { Observable, of } from 'rxjs';

export interface Movie {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface RequestState<T> {
  error?: string;
  data?: T;
  loading: boolean;
}

export function EMPTY(): RequestState<any> {
  return {
    loading: false,
  };
}

export function LOADING(): RequestState<any> {
  return {
    loading: true,
  };
}

export function ERROR(error: string): RequestState<any> {
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

export function EMPTY$(): Observable<RequestState<any>> {
  return of(EMPTY());
}

export function LOADING$(): Observable<RequestState<any>> {
  return of(LOADING());
}

export function ERROR$(error: string): Observable<RequestState<any>> {
  return of(ERROR(error));
}

export function SUCCESS$<T>(data: T): Observable<RequestState<T>> {
  return of(SUCCESS(data));
}
