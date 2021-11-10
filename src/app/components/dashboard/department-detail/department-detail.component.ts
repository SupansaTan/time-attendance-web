import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { NgOption } from "@ng-select/ng-select";
import { DepartmentService } from 'src/app/service/department.service';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  departmentId: number
  date: Date | string;
  department: any;
  employees: Array<any>;
  page: any;
  pageSize: any;
  table_option: NgOption[]

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
    this.date = new Date();
    this.date = this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    this.departmentId = Number(location.pathname.split("/")[2])
    this.department = this.departmentService.getDepartment(this.departmentId)
    this.employees = this.employeeService.getEmployees()
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }
}
