import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/model/employee.model';
import { DashboardService } from './dashboard.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Array<EmployeeModel> = new Array<EmployeeModel>()

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.GetEmployees().subscribe((response) => {
      this.employees = response
    })
  }

}
