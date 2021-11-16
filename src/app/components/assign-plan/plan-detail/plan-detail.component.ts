import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { ShiftService } from '../shift.service';
import { DashboardService } from '../../dashboard/dashboard.service';
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

import { NgOption } from "@ng-select/ng-select";

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.component.html',
  styleUrls: ['./plan-detail.component.scss']
})
export class PlanDetailComponent implements OnInit {
  departmentId: number
  today: Date
  date: Date | string;
  department: any;
  employees: Array<any>;

  page: any;
  pageSize: any;
  table_option: NgOption[]
  isAllChecked: boolean = false
  countSelected: number = 0

  mode: Array<string> = []
  otBtnActive: boolean
  shiftBtnActive: boolean

  dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  ot_plan: number = 0

  filter: FormControl = new FormControl('');

  filter_select = {
    shift: 'All',
    ot: 'All',
    type: 'All'
  }
  shift_option: NgOption[] = [
    { id: 0, value: 'All'}
  ]
  ot_option: NgOption[] = [
    { id: 0, value: 'All'}
  ]
  type_option: NgOption[] = [
    { id: 0, value: 'All'},
    { id: 1, value: 'Daily'},
    { id: 2, value: 'Monthly'}
  ]

  constructor(private dashboardService: DashboardService, private departmentService: DepartmentService,
    private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.page = 1
    this.pageSize = 10  // row of each page table
    this.table_option = [
      { value: 2 },
      { value: 5 },
      { value: 10 }
    ];
    this.today = new Date();
    this.date = this.today.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    this.otBtnActive, this.shiftBtnActive = false
    this.departmentId = Number(location.pathname.split("/")[2])
    this.department = this.departmentService.getDepartment(this.departmentId)
    this.employees = this.employeeService.getEmployees()
    this.employees.map((employee) => employee.checked = false)
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }

  setAssignMode(selectMode: string) {
    selectMode === 'shift'
      ? this.shiftBtnActive = !this.shiftBtnActive
      : this.otBtnActive = !this.otBtnActive

    if(this.mode.includes(selectMode)) {
      this.mode.splice(this.mode.indexOf(selectMode), 1); // remove if exist
    }
    else {
      this.mode.push(selectMode)
    }
  }

  setAllSelected() {
    this.employees.map((employee) => employee.checked = this.isAllChecked)
    this.updateEmployeeSelected()
  }

  updateEmployeeSelected() {
    this.countSelected = this.employees.filter((employee) => employee.checked == true).length
  }

  localeDateFormat(date: Date) {
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    })
  }


}
