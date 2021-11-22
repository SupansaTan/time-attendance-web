import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleLoginProvider, SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { AuthorizationService } from 'src/app/service/authorization.service';

import { EmployeeModel } from 'src/app/model/employee.model';
import { LoginModel, TokenModel, ConfirmedRegisterModel } from 'src/app/model/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
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
    this.loginForm.markAllAsTouched();
    if (this.loginForm.valid) {
      this.authService.login(this.login).subscribe(res => {
        if (res.status === 200) {
          // login successful
          this.authService.getCurrentUserRole(res.data.token).subscribe(empRole => {
            if (empRole && empRole.status === 200) {
              this.tokenModel = res.data;
              this.localStorageService.set('accessToken', this.tokenModel.token);
              this.localStorageService.set('empId', empRole.data.employeeId);
              this.localStorageService.set('role', empRole.data.role);
              this.authorizationService.setLoginStatus(true);
              this.router.navigate(['dashboard']);
            }
            else {
              // can't get user role
              this.messageError = empRole.message;
              console.error(empRole.message);
              this.localStorageService.removeAll();
            }
          });
        }
        else {
          // login unsuccessful
          this.messageError = res.message;
        }
      });
    }
  }

}
