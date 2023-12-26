import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
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
    exact1: new FormControl('', [Validators.required, exactName('Houdini')]),
    email1: new FormControl(''),
    password1: new FormControl(''),
  });

  onSubmit() {
    console.log(this.form);
  }

  isInvalid(name: string): boolean {
    const control = this.form.get(name);

    if (!control) {
      return false;
    }

    return control.touched && !!control.errors;
  }

  getNgClass(name: string) {
    return {
      'form-control': true,
      'is-invalid': this.isInvalid(name),
    };
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
