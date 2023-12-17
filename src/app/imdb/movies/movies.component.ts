import { Component, Input } from '@angular/core';
import { MOVIES_EMPTY, MovieListState } from '../data/imdb.model';
import { ErrorComponent } from '../../error/error.component';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SpinnerComponent, ErrorComponent, NgIf],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
})
export class MoviesComponent {
  @Input() movies: MovieListState = MOVIES_EMPTY;

  JSON = JSON;
}
