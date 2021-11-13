import { Component, OnInit } from '@angular/core';
import { ShiftService } from '../shift.service';
import { EmployeeModel } from 'src/app/model/employee.model';
import { DepartmentModel } from 'src/app/model/department.model';
import { ShiftCodeModel, PlanShiftModel } from 'src/app/model/shift.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { NgOption } from "@ng-select/ng-select";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  departmentId: number
  date: Date | string;
  employees: Array<EmployeeModel> = new Array<EmployeeModel>();
  department: Array<DepartmentModel> = new Array<DepartmentModel>();
  shiftcode: Array<ShiftCodeModel> = new Array<ShiftCodeModel>();
  planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>();
  timerecord: Array<TimeRecordModel> = new Array<TimeRecordModel>();
  page: any;
  pageSize: any;
  table_option: NgOption[];

  start_time_option: NgOption[];
  shift_bt: boolean;
  ot_bt: boolean;

  constructor(private shiftService:ShiftService) { }

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
    
    this.shiftService.getDepartment(this.departmentId).subscribe((response) => {
      this.department = response})

    this.shiftService.getDepPlanShift(this.departmentId).subscribe((response) => {
      this.planshifts = response})

    this.shift_bt = false
    this.ot_bt = false

    // this.shiftService.getEmployee(this.departmentId).subscribe((response) => {
    //   this.employees = response})

    // this.shiftService.getShiftCode().subscribe((response) => {
    //   this.shiftcode = response})

  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.shiftService.getPercentage(actual_emp, total_emp)
  }

  toggle_shift(){
    // when click on Shift Button => this.shift_bt = True
    // 
  }

  toggle_ot(){
    // when click on OT Button => this.ot_bt = True
  }
}
