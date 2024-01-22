import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-extra',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.scss',
})
export class ExtraComponent {
  form = new FormGroup({});

  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {
    if (this.controlContainer.control instanceof FormGroup) {
      this.form = this.controlContainer.control;
    }
  }
}
