import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutComponent } from './components/layout/layout.component';
import { NavigationBarComponent } from './components/layout/navigation-bar/navigation-bar.component';
import { BreadcrumbComponent } from './components/layout/breadcrumb/breadcrumb.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { IconsModule } from './icons/icons.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationBarComponent,
    NavbarComponent,
    BreadcrumbComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    IconsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule,
    SocialLoginModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
              '155291623976-togtk2t8329orqtj6mvrjsleavanenf9.apps.googleusercontent.com'
            )
          }
        ]
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
