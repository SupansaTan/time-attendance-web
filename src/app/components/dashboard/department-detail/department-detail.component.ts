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

  today_plan: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()
  today_timerecords: Array<TimeRecordModel> = new Array<TimeRecordModel>()
  employees: Array<EmployeeModel> = new Array<EmployeeModel>()
  department: DepartmentModel = new DepartmentModel()
  current_shift: Array<PlanShiftModel>
  active_emp: number = 0
  intervalGetData: any

  in_record: TimeRecordModel = new TimeRecordModel()
  out_record: TimeRecordModel = new TimeRecordModel()

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
    this.dashboardService.getTodayDepPlanShift(this.departmentId).subscribe((response) => {
      let plan = response
      console.log('today plan1 = ', plan)
      if (plan[0]){
        this.today_plan = plan
        this.findNowShift()
        this.getEmployeeTimeRecord()
      }
    });

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
      console.log('today plan1 = ', plan)
      if (plan[0]){
        this.today_plan = plan
        this.findNowShift()
        this.getEmployeeTimeRecord()
      }
    });
  }

  getEmployeeTimeRecord() {
    this.dashboardService.getTodayDepTimerecord(this.departmentId).subscribe((response) => {
      this.today_timerecords = response
      if(response[0]) {
        this.employees = this.today_timerecords[0].employee
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
    this.current_shift = this.today_plan.filter((plan) => plan.start_time === allShifts[index])
    this.cardRegisterService.getActiveEmployee(this.departmentId, this.current_shift[0].start_time).subscribe(res => {
      if(res[0]) {
        this.active_emp = res.length
      }
      this.spinner.hide()
    })
  }

  findTimeRecord(emp_id: number){
    this.in_record = new TimeRecordModel()
    this.out_record = new TimeRecordModel()
    let in_ = this.today_timerecords.filter(element => element.employee[0].id == emp_id && element.status == "In")[0]
    let out_ = this.today_timerecords.filter(element => element.employee[0].id == emp_id && element.status == "Out")[0]

    in_? this.in_record = in_ : false
    out_? this.out_record = out_: false

    return this.in_record
  }
}
