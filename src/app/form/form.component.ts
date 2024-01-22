import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ExtraComponent } from './extra/extra.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, NgIf, FormsModule, ExtraComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  form = new FormGroup({
    text1: new FormControl(''),
    exact1: new FormControl('', [Validators.required, exactName('Houdini')]),
    email1: new FormControl('', [Validators.required, Validators.email]),
    password1: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    phoneInfo: new FormGroup({
      mobilePhone: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    }),
    extraInfo: new FormGroup({
      description: new FormControl('abc', [Validators.required]),
    }),
  });

  separateField = 'separate';

  onSubmit() {
    this.form.markAllAsTouched();
    console.log(this.form);
  }

  isInvalid(name: string): boolean {
    return !!this.getError(name);
  }

  getNgClass(name: string) {
    return {
      'form-control': true,
      'is-invalid': this.isInvalid(name),
    };
  }

  getError(name: string): string {
    const control = this.form.get(name);

    if (!control || !control.touched || !control.errors) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required';
    }

    if (control.errors['email']) {
      return 'Not a valid email';
    }

    if (control.errors['minlength']) {
      return (
        'Length must be at least ' +
        control.errors['minlength']['requiredLength']
      );
    }

    return Object.values(control.errors).pop() || 'Invalid';
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
