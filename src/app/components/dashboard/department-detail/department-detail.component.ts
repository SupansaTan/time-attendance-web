import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { NgOption } from "@ng-select/ng-select";

import { PlanShiftModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { DepartmentModel } from 'src/app/model/department.model';

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

  today_planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  today_plan_exist: boolean
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()
  today_timerecords: Array<TimeRecordModel> = new Array<TimeRecordModel>()
  department: DepartmentModel = new DepartmentModel()

  in_record: TimeRecordModel = new TimeRecordModel()
  out_record: TimeRecordModel = new TimeRecordModel()

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.page = 1
    this.pageSize = 10  // row of each page table
    this.table_option = [
      { value: 2 },
      { value: 5 },
      { value: 10 }
    ];
    this.date = new Date();
    this.date = this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    /* get data */
    this.departmentId = Number(location.pathname.split("/")[2])

    this.dashboardService.getDepartmentInfo(this.departmentId).subscribe((response) => {
      this.department = response[0]
    });

    this.dashboardService.getTodayDepPlanShift(this.departmentId).subscribe((response) => {
      let plan = response
      if (plan[0]){
        console.log('found')
        this.today_planshifts = plan
      }
    });

    this.dashboardService.getTodayDepTimerecord(this.departmentId).subscribe((response) => {
      this.today_timerecords = response
    });

  }


  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }

  findTimeRecord(emp_id:any){
    this.in_record = new TimeRecordModel()
    this.out_record = new TimeRecordModel()
    let in_ = this.today_timerecords.filter(element => element.employee[0].id == emp_id && element.status == "In")[0]
    let out_ = this.today_timerecords.filter(element => element.employee[0].id == emp_id && element.status == "Out")[0]

    in_? this.in_record = in_ : false
    out_? this.out_record = out_: false
    return this.in_record
  }
}
