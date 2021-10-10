import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmRegisterComponent } from './confirm-register/confirm-register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmRegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthenticationModule { }
