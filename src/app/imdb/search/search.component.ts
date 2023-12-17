import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
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
}
