import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  date: Date | string;
  department: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.date = new Date();
    this.date = this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    this.department = {
      id: 1,
      name: 'งานเชือดไก่',
      start_time: '05:00',
      end_time: '13:00',
      ot_plan: 2.5,
      actual_emp: 24,
      total_emp: 30
    }
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }
}
