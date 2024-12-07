import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about-page.component').then((m) => m.AboutPageComponent),
  },
  {
    path: 'contacts',
    loadComponent: () =>
      import('./pages/contacts/contacts.page.component').then((m) => m.ContactsPageComponent),
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.page.component').then((m) => m.ProjectsPageComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.page.component').then((m) => m.PrivacyPolicyPageComponent),
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