import { Component,OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  email: string;
  password: string;

  constructor(private router: Router,
    private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
  }
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['dashboard']));
  }

  LoginUser(){
    
    //login for manager
    if(this.email == "admin@gmail.com" && this.password == "1234")
    {
      alert("Welcome Manager to Time-attendance")
      this.router.navigate(['dashboard']);
    }
    //login for employee
    else if(this.email == "xxxx@gmail.com" && this.password == "1234")
    {
      alert("Welcome Employee to Time-attendance")
      this.router.navigate(['/dashboard/dashboard-employee']);
    }

    else if(this.email == " " || this.password == " ")
    {
      alert("incorrect username or password")
      this.router.navigate(['/auth/login']);
    }

    else
    {
      alert("incorrect username or password")
      this.router.navigate(['/auth/login']);
    }


  }
}
