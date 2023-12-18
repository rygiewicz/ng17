import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ImdbComponent } from './imdb/imdb.component';
import { DetailComponent } from './imdb/detail/detail.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'imdb', component: ImdbComponent },
  { path: 'imdb/:id', component: DetailComponent },
  { path: 'form', component: FormComponent},
  { path: '**', component: NotFoundComponent },
];
