import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ImdbService } from './data/imdb.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ErrorComponent } from '../error/error.component';

@Component({
  selector: 'app-imdb',
  standalone: true,
  imports: [FormsModule, AsyncPipe, NgIf, SpinnerComponent, ErrorComponent],
  templateUrl: './imdb.component.html',
  styleUrl: './imdb.component.scss',
})
export class ImdbComponent {
  constructor(public imdbService: ImdbService) {}

  JSON = JSON;

  onSubmit(f: NgForm) {
    const phrase = String(f.value.phrase || '');

    this.imdbService.setPhrase(phrase);
  }
}
