import { Observable, of } from 'rxjs';

export interface RequestState<T> {
  error?: string;
  data?: T;
  loading: boolean;
}

export function RS_EMPTY(): RequestState<any> {
  return {
    loading: false,
  };
}

export function RS_LOADING(): RequestState<any> {
  return {
    loading: true,
  };
}

export function RS_ERROR(error: string): RequestState<any> {
  return {
    error,
    loading: false,
  };
}

export function RS_SUCCESS<T>(data: T): RequestState<T> {
  return {
    data,
    loading: false,
  };
}

export function RS_EMPTY$(): Observable<RequestState<any>> {
  return of(RS_EMPTY());
}

export function RS_LOADING$(): Observable<RequestState<any>> {
  return of(RS_LOADING());
}

export function RS_ERROR$(error: string): Observable<RequestState<any>> {
  return of(RS_ERROR(error));
}

export function RS_SUCCESS$<T>(data: T): Observable<RequestState<T>> {
  return of(RS_SUCCESS(data));
}
