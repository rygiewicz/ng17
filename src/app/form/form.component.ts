import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  form = new FormGroup({
    text1: new FormControl(''),
    email1: new FormControl(''),
    password1: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form.value);
  }
}
