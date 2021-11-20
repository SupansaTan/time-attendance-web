import { Component,OnInit} from '@angular/core';
import {GoogleLoginProvider, SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { EmployeeModel } from 'src/app/model/employee.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit  {
  all_employee: Array<EmployeeModel> = new Array<EmployeeModel>();
  email: string;
  password: string;
  role: string;

  constructor(private router: Router,
    private socialAuthService: SocialAuthService ,
    private authenService : AuthenticationService ) {
  }

  //oninit
  ngOnInit(): void {
    this.authenService.getAllEmployee().subscribe((response)=>{
      this.all_employee = response
    })
    
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['dashboard']));
  }

  LoginUser(){
    let user = this.authenService.getUser(this.all_employee, this.email, this.password)
    if (user){
      this.role = this.authenService.getUserRole()
      //login for manager
      if (this.role == 'manager')
      {
        alert("Welcome Manager to Time-attendance")
        this.router.navigate(['dashboard']);
      }
      //login for employee
      else if (this.role == 'employee')
      {
        alert("Welcome Employee to Time-attendance")
        this.router.navigate(['dashboard']);
      }
    }

    else{
      alert("incorrect username or password")
      this.router.navigate(['/auth/login']);
    }

  }
  
}
