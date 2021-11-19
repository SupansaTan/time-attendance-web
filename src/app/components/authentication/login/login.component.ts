import { Component,OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {

  email: string;
  password: string;

  constructor(private router: Router,
    private socialAuthService: SocialAuthService ,
    private authenService : AuthenticationService ) {
  }

  //oninit
  ngOnInit(): void {
    
    
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
    else if(this.authenService.getUser(this.email, this.password))
    {
      console.log(this.password)
      alert("Welcome Employee to Time-attendance")
      this.router.navigate(['/dashboard/dashboard-employee']);
    }

    else if(this.authenService.getEmail(this.email) == "" || this.authenService.getPassword(this.password) == "")
    {
      alert("incorrect username or password")
      this.router.navigate(['/auth/login']);
    }

    else if(this.authenService.getEmail(this.email) != this.authenService.getEmail(this.email) || this.authenService.getPassword(this.password) !=this.authenService.getPassword(this.password) )
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
