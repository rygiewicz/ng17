import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  @Output() onSearch = new EventEmitter<string>();

  onSubmit(f: NgForm) {
    const phrase = String(f.value.phrase || '');

    this.onSearch.emit(phrase);
  }
}
