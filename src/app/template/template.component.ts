import { Component } from '@angular/core';
import { OutletComponent } from './outlet/outlet.component';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [OutletComponent],
  templateUrl: './template.component.html',
  styleUrl: './template.component.scss',
})
export class TemplateComponent {}
