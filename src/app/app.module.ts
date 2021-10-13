import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './components/layout/layout.component';
import { NavigationBarComponent } from './components/layout/navigation-bar/navigation-bar.component';
import { BreadcrumbComponent } from './components/layout/breadcrumb/breadcrumb.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { AssignShiftComponent } from './components/assign-shift/assign-shift.component';
import { AssignOTComponent } from './components/assign-ot/assign-ot.component';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from './icons/icons.module';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationBarComponent,
    NavbarComponent,
    BreadcrumbComponent,
    AssignShiftComponent,
    AssignOTComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
