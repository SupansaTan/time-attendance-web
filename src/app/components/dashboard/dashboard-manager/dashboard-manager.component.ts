import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from '../dashboard.service'

import { DepartmentModel } from 'src/app/model/department.model';
import { PlanShiftModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';
import { LocalStorageService } from 'src/app/service/localStorage.service';


@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.scss']
})
export class DashboardManagerComponent implements OnInit {
  employee_id: number;
  intervalGetData: any;
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()
  departments: Array<DepartmentModel> = new Array<DepartmentModel>()
  all_today_planshift: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  each_dep_plan: PlanShiftModel = new PlanShiftModel()

  constructor(
    private dashboardService: DashboardService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.employee_id = Number(this.localStorageService.get<string>('empId'))
    this.getDepartmentInfo()
    this.intervalGetData = setInterval(() => {
      this.getDepartmentInfo()
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervalGetData) {
      clearInterval(this.intervalGetData);
    }
  }

  getDepartmentInfo() {
    this.dashboardService.getEmployeeInfo(this.employee_id).subscribe((response) => {
      this.manager_info = response
      this.departments = []

      this.manager_info[0].department.forEach( (element:any) =>{
        this.departments.push(element)
        this.dashboardService.getTodayDepPlanShift(element.id).subscribe((res) => {
          this.all_today_planshift = this.all_today_planshift.concat(res)
          this.spinner.hide()
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

