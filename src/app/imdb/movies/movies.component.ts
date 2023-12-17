import { Component, Input, TrackByFunction } from '@angular/core';
import { MOVIE_LIST_EMPTY, Movie, MovieListState } from '../data/imdb.model';
import { ErrorComponent } from '../../error/error.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SpinnerComponent, ErrorComponent, NgIf, NgFor, RouterLink],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  @Input() movies: MovieListState = MOVIE_LIST_EMPTY;

  JSON = JSON;

  trackMovies: TrackByFunction<Movie> = (index, item) => item.id;
}
