import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.scss']
})
export class DashboardManagerComponent implements OnInit {
  departments: Array<any> = new Array<any>()

  constructor(private dashboardService: DashboardService, private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.departments = this.departmentService.getDepartments()
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }
}
