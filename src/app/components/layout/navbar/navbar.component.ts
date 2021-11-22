import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { SocialAuthService } from 'angularx-social-login';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  showNavRight: boolean;
  public screenWidth: any;

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private localStorageService: LocalStorageService,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.showNavRight = !(this.screenWidth < 992)
    // this.socialAuthService.authState.subscribe((socialUser) => {
    //   this.username  = socialUser.name;
    // });
    let userId = Number(this.localStorageService.get<string>('empId'))
    if(userId) {
      this.employeeService.getEmployee(userId).subscribe((res) => {
        const emp = res[0]
        this.username = emp.first_name + ' ' + emp.last_name
      })
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.showNavRight = !(this.screenWidth < 992)
  }

  logout(): void {
    this.localStorageService.removeAll()
    this.router.navigate(['/auth/login']);
  }
}
