import { Component} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent   {

  email: string;
  password: string;

  constructor(private router: Router,
    private socialAuthService: SocialAuthService) {
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['dashboard']));
  }

  LoginUser(){
    if(this.email == "Admin" && this.password == "1234")
    {
      console.log("welcome")
      this.router.navigate(['dashboard']);
    }
  }
}
