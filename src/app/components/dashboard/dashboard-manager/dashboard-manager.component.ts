import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { DepartmentService } from 'src/app/service/department.service';

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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.employee_id = 7

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
