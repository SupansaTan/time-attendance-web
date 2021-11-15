import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { NgOption } from "@ng-select/ng-select";

import { PlanShiftModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';

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

  planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()
  timerecords: Array<TimeRecordModel> = new Array<TimeRecordModel>()

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

    this.departmentId = Number(location.pathname.split("/")[2])

    this.dashboardService.getDepPlanShift(this.departmentId).subscribe((response) => {
      this.planshifts = response
    });

    this.dashboardService.getTodayDepTimerecord(this.departmentId).subscribe((response) => {
      this.timerecords = response
    });

  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }
}
