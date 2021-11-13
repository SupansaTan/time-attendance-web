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
import { AssignPlanComponent } from './components/assign-plan/assign-plan.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationBarComponent,
    NavbarComponent,
    BreadcrumbComponent,
    AssignPlanComponent
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
    RouterModule.forRoot([
      {path: 'auth/login', component: LoginComponent},
      {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]}, // only accessible if authorised
      {path: 'auth/login', component: LoginComponent}
    ]),
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
      AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
