import { Component } from '@angular/core';
import { ImdbService } from './data/imdb.service';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { MoviesComponent } from './movies/movies.component';

@Component({
  selector: 'app-imdb',
  standalone: true,
  imports: [AsyncPipe, NgIf, SearchComponent, MoviesComponent, JsonPipe],
  templateUrl: './imdb.component.html',
  styleUrl: './imdb.component.scss',
})
export class ImdbComponent {
  movieList$ = this.imdbService.getMovieList$();
  autocompleteList$ = this.imdbService.getAutocompleteList$();

  constructor(private imdbService: ImdbService) {}

  onSearchSubmit(phrase: string) {
    this.imdbService.setSearchPhrase(phrase);
  }

  onSearchChange(phrase: string) {
    this.imdbService.setAutocompletePhrase(phrase);
  }
}
