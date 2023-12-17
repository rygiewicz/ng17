import { Component } from '@angular/core';
import { ImdbService } from './data/imdb.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MoviesComponent } from './movies/movies.component';

@Component({
  selector: 'app-imdb',
  standalone: true,
  imports: [AsyncPipe, NgIf, SearchComponent, MoviesComponent],
  templateUrl: './imdb.component.html',
  styleUrl: './imdb.component.scss',
})
export class ImdbComponent {
  movieList$ = this.imdbService.getMovieList$();

  constructor(private imdbService: ImdbService) {}

  onSearch(phrase: string) {
    this.imdbService.setPhrase(phrase);
  }
}
