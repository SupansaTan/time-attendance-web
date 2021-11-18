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
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()
  departments: Array<DepartmentModel> = new Array<DepartmentModel>()
  all_today_planshift: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  each_dep_plan: PlanShiftModel = new PlanShiftModel()

  constructor(private dashboardService: DashboardService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.employee_id = this.authService.getUserid()

    this.dashboardService.getEmployeeInfo(this.employee_id).subscribe((response) => {
      this.manager_info = response

      this.manager_info[0].department.forEach( (element:any) =>{
        this.departments.push(element)
        this.dashboardService.getTodayDepPlanShift(element.id).subscribe((res) => {
          this.all_today_planshift = this.all_today_planshift.concat(res)
        })
      })
    })

  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }

  getDepPlanShift(dep_id:number){
    this.each_dep_plan = new PlanShiftModel()
    let plan = this.all_today_planshift.filter((element) => element.department[0].id == dep_id)
    if (plan[0]){
      this.each_dep_plan = plan[0]
    }
    return this.each_dep_plan
  }
}

