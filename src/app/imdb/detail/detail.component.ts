import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Movie } from '../data/imdb.model';
import { RS_EMPTY$, RequestState } from '../../request.model';
import { ImdbService } from '../data/imdb.service';
import { SpinnerComponent } from '../../spinner/spinner.component';
import { ErrorComponent } from '../../error/error.component';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [SpinnerComponent, ErrorComponent, NgIf, AsyncPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  movie$: Observable<RequestState<Movie>>;

  constructor(
    private activeRoute: ActivatedRoute,
    private imdbService: ImdbService
  ) {
    this.movie$ = activeRoute.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');

        if (!id) {
          return RS_EMPTY$();
        }

        return imdbService.getMovie$(id);
      })
    );
  }
}
