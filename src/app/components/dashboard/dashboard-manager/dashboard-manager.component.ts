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
  current_shift: Array<any>

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
          res.map(item => {
            let planExist = this.all_today_planshift.filter(plan =>
              plan.department[0].id == item.department[0].id &&
              plan.start_time == item.start_time &&
              plan.employee[0].id == item.employee[0].id
            )
            if(planExist.length == 0) {
              this.all_today_planshift.push(item)
            }
          })
          this.spinner.hide()
        })
      })
    })
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }

  getDepPlanShift(dep_id: number){
    let plan = this.all_today_planshift.filter((element) => element.department[0].id == dep_id)
    if (plan[0]){
      return plan
    }
  }

  hasPlan(dep_id: number) {
    let plan = this.all_today_planshift.filter((element) => element.department[0].id == dep_id)
    if (plan[0]){
      return true
    }
    else {
      return false
    }
  }

  findNowShift(dep_id: number) {
    let allShifts: Array<string> = []
    let today = new Date()
    let now = today.getHours() + ':' + today.getMinutes()
    let dep_plan = this.getDepPlanShift(dep_id)

    if(dep_plan) {
      dep_plan.map((plan) => { allShifts.push(plan.start_time) })
      allShifts.push(now)

      allShifts.sort(function(a, b) {
        return Date.parse('1970/01/01 ' + a) - Date.parse('1970/01/01 ' + b)  // sort shift
      });

      let index = allShifts.indexOf(now)<0? allShifts.length-2: allShifts.indexOf(now)==0? 1: allShifts.indexOf(now)-1
      this.current_shift = this.all_today_planshift.filter((plan) => plan.start_time === allShifts[index])
      return this.current_shift
    }
    else {
      this.current_shift = []
      return this.current_shift
    }
  }
}

