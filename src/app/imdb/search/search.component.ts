import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { AutocompleteItem } from './data/search.model';
import { RS_EMPTY, RequestState } from '../../request.model';
import { SpinnerComponent } from '../../spinner/spinner.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule,
    AsyncPipe,
    NgbDropdownModule,
    NgIf,
    NgFor,
    NgClass,
    SpinnerComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Input() autocomplete: RequestState<AutocompleteItem[]> = RS_EMPTY();
  @Output() onSubmit: Observable<string>;
  @Output() onChange = new EventEmitter<string>();

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
    this.onSubmit = this.activeRoute.queryParamMap.pipe(
      map((params) => {
        const value = params.get('p');

        return value || '';
      })
    );
  }

  onFormSubmit(f: NgForm) {
    const phrase = String(f.value.phrase || '');

    this.router.navigate([], { queryParams: { p: phrase } });
  }

  noSuggestions() {
    return !this.autocomplete.data?.length && !this.autocomplete.loading;
  }
}
