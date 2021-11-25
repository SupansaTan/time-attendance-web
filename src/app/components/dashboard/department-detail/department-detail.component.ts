import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { NgOption } from "@ng-select/ng-select";
import { NgxSpinnerService } from "ngx-spinner";

import { PlanShiftModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { DepartmentModel } from 'src/app/model/department.model';
import { CardRegisterService } from 'src/app/service/card-register.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  departmentId: number
  date: Date | string;
  page: any;
  pageSize: any;
  table_option: NgOption[]
  shift_option: Array<any>

  today_plan: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()
  employees: Array<EmployeeModel> = new Array<EmployeeModel>()
  department: DepartmentModel = new DepartmentModel()
  current_shift: Array<PlanShiftModel>
  active_emp: number = 0
  intervalGetData: any
  changeSelect: boolean = false
  shiftSelect: string

  constructor(
    private dashboardService: DashboardService,
    private spinner: NgxSpinnerService,
    private cardRegisterService: CardRegisterService
  ) { }

  ngOnInit(): void {
    this.spinner.show()
    this.initTable()
    this.date = new Date();
    this.date = this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })

    /* get data */
    this.departmentId = Number(location.pathname.split("/")[2])
    this.getDepartmentInfo()
    this.getDepartmentPlan()

    this.intervalGetData = setInterval(() => {
      this.getDepartmentInfo()
      this.getDepartmentPlan()
    }, 10000);
  }

  ngOnDestroy() {
    if (this.intervalGetData) {
      clearInterval(this.intervalGetData);
    }
  }

  getDepartmentInfo() {
    this.dashboardService.getDepartmentInfo(this.departmentId).subscribe((response) => {
      this.department = response[0]
    });
  }

  getDepartmentPlan() {
    this.dashboardService.getTodayDepPlanShift(this.departmentId).subscribe((response) => {
      let plan = response
      if (plan.length > 0){
        this.today_plan = plan
        this.initShiftOptions()
        this.changeSelect? this.updateCurrentShift() : this.findNowShift()
      }
      else {
        this.spinner.hide()
      }
    });
  }

  initTable() {
    this.page = 1
    this.pageSize = 10  // row of each page table
    this.table_option = [
      { value: 2 },
      { value: 5 },
      { value: 10 }
    ];
  }

  initShiftOptions() {
    this.shift_option = []
    this.today_plan.forEach((plan) => {
      let planExist = this.shift_option.filter(s => s.start == plan.start_time)
      if(planExist.length == 0) {
        this.shift_option.push({
          start: plan.start_time,
          end: plan.end_time,
          val: plan.start_time.slice(0,5) + ' - ' + plan.end_time.slice(0,5)
        })
      }
    })
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }

  findNowShift() {
    let allShifts: Array<string> = []
    let today = new Date()
    let now = today.getHours() + ':' + today.getMinutes()

    this.today_plan.map((plan) => { allShifts.push(plan.start_time) })
    allShifts.push(now)
    allShifts.sort(function(a, b) {
      return Date.parse('1970/01/01 ' + a) - Date.parse('1970/01/01 ' + b)  // sort shift
    });

    let index = allShifts.indexOf(now)<0? allShifts.length-2: allShifts.indexOf(now)==0? 1: allShifts.indexOf(now)-1
    this.shiftSelect = this.shift_option.filter(s => s.start == allShifts[index])[0].start
    this.updateCurrentShift()
  }

  updateCurrentShift() {
    this.employees = []
    this.current_shift = this.today_plan.filter((plan) => plan.start_time === this.shiftSelect)
    this.current_shift.forEach((plan) => { this.employees.push(plan.employee[0]) })
    this.findTimeRecord()

    if(this.current_shift.length > 0) {
      this.cardRegisterService.getActiveEmployee(this.departmentId, this.shiftSelect).subscribe(res => {
        this.active_emp = res.length
        this.spinner.hide()
      })
    }
    else {
      this.spinner.hide()
    }
  }

  optionChange() {
    this.changeSelect = true
    this.updateCurrentShift()
  }

  findTimeRecord() {
    this.employees.forEach(emp => {
      this.cardRegisterService.getTimeRecord(emp.id).subscribe(res => {
        let IN = res.filter(record => record.status == 'In')[0]
        let OUT = res.filter(record => record.status == 'Out')[0]

        IN? emp.in = IN.time : false
        OUT? emp.out = OUT.time : false
      })
      this.spinner.hide()
    })
  }
}
