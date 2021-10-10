import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    NavbarComponent,
    NavigationBarComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
