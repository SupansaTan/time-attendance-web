import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'

@Component({
  selector: 'app-dashboard-manager',
  templateUrl: './dashboard-manager.component.html',
  styleUrls: ['./dashboard-manager.component.scss']
})
export class DashboardManagerComponent implements OnInit {
  departments: Array<any> = new Array<any>()

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    /* mock departments & waiting api */
    this.departments = [
      {
        id: 1,
        name: 'งานเชือดไก่',
        start_time: '05:00',
        end_time: '13:00',
        ot_plan: 2.5,
        actual_emp: 24,
        total_emp: 30
      },
      {
        id: 2,
        name: 'งานถอนขนไก่',
        start_time: '05:00',
        end_time: '13:00',
        ot_plan: 2.5,
        actual_emp: 24,
        total_emp: 30
      },
      {
        id: 3,
        name: 'งานไก่ตกราว',
        start_time: '13:00',
        end_time: '21:00',
        ot_plan: 2.5,
        actual_emp: 0,
        total_emp: 30
      },
      {
        id: 4,
        name: 'งานเชือดไก่',
        start_time: '05:00',
        end_time: '13:00',
        ot_plan: 2.5,
        actual_emp: 24,
        total_emp: 30
      },
      {
        id: 5,
        name: 'งานถอนขนไก่',
        start_time: '05:00',
        end_time: '13:00',
        ot_plan: 2.5,
        actual_emp: 24,
        total_emp: 30
      },
    ]
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }
}
