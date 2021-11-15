import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { AuthenticationService } from '../../authentication/authentication.service';

import { DepartmentModel } from 'src/app/model/department.model';
import { PlanShiftModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';


@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.scss']
})
export class DashboardManagerComponent implements OnInit {
  employee_id: number;
  planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()

  constructor(private dashboardService: DashboardService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.employee_id = this.authService.getUserid()

    this.dashboardService.getEmployeeInfo(this.employee_id).subscribe((response) => {
      this.manager_info = response
      this.manager_info[0].department.forEach( (element:any) =>{
        let department_id = (element.id)
        this.dashboardService.getDepPlanShift(department_id).subscribe((response) => {
          this.planshifts.push(response[0])
        });
      });
    });


  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }
}
