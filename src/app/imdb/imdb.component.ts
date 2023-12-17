import { Component } from '@angular/core';
import { ImdbService } from './data/imdb.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-imdb',
  standalone: true,
  imports: [AsyncPipe, NgIf, SpinnerComponent, ErrorComponent, SearchComponent],
  templateUrl: './imdb.component.html',
  styleUrl: './imdb.component.scss',
})
export class ImdbComponent {
  constructor(public imdbService: ImdbService) {}

  JSON = JSON;

  onSearch(phrase: string) {
    this.imdbService.setPhrase(phrase);
  }
}
