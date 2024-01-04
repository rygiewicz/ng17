import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-outlet',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './outlet.component.html',
  styleUrl: './outlet.component.scss',
})
export class OutletComponent {
  @ContentChild('template1') template1: TemplateRef<any> | null = null;

  template1Title = 'Hello!';
  template1Description =
    'discourse intended to give a mental image of something experienced';
}
