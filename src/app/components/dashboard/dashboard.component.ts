import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/model/employee.model';
import { DashboardService } from './dashboard.service'
import { NgxSpinnerService } from "ngx-spinner";
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hideSpinner: boolean = false;
  role: string;
  employees: Array<EmployeeModel> = new Array<EmployeeModel>()

  constructor(private dashboardService: DashboardService, private spinner: NgxSpinnerService,
    private authService: AuthenticationService) { }

  ngOnInit(): void {
    // this.spinner.show()
    // this.dashboardService.GetEmployees().subscribe((response) => {
    //   this.employees = response

    //   setTimeout(() => {
    //     this.hideSpinner = true;
    //     this.spinner.hide();
    //   }, 1000);
    // })
    this.role = this.authService.getUserRole()
    this.hideSpinner = true;
  }
}
