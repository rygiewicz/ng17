import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  form = new FormGroup({
    text1: new FormControl(''),
    exact1: new FormControl('', exactName('Houdini')),
    email1: new FormControl(''),
    password1: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form);
  }
}

function exactName(name: string): ValidatorFn {
  return (control: AbstractControl) => {
    if (control.value === name) {
      return null;
    }

    return {
      exactName: `Name should be exactly ${name}`,
    };
  };
}
