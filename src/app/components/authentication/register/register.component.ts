import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { AuthorizationService } from 'src/app/service/authorization.service';

import { EmployeeModel } from 'src/app/model/employee.model';
import { LoginModel, TokenModel, ConfirmedRegisterModel } from 'src/app/model/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  login: LoginModel = new LoginModel();
  messageError = '';
  token: string;
  url: string;
  tokenModel: TokenModel = new TokenModel();

  constructor(private router: Router,
    private socialAuthService: SocialAuthService,
    private authService : AuthenticationService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private authorizationService: AuthorizationService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['dashboard']));
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(320),
      ]),
    });
  }

  submit() {

  }

}
