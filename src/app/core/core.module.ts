import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SHARED_CORE_COMPONENTS } from './components';
import { ROOT_CORE_SERVICES } from './services';

const importExportsModules = [
  CommonModule,
  RouterModule,
  RouterOutlet,
  FormsModule,
  ReactiveFormsModule,
];
// MomentDateModule

@NgModule({
  declarations: [...SHARED_CORE_COMPONENTS],
  imports: [...importExportsModules],
  exports: [...importExportsModules, ...SHARED_CORE_COMPONENTS],
  //providers: [.providers],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [...ROOT_CORE_SERVICES],
    };
  }
}
