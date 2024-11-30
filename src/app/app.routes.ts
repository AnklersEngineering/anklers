import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: '404',
    loadComponent: () =>
      import('./pages/404/404-page.component').then((m) => m.NotFoundPageComponent),
  },
  
  {
    path: '**',
    redirectTo: '404',
  },
];