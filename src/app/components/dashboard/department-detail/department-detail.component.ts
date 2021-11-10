import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service'
import { NgOption } from "@ng-select/ng-select";

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss']
})
export class DepartmentDetailComponent implements OnInit {
  date: Date | string;
  department: any;
  employees: Array<any>;
  page: any;
  pageSize: any;
  table_option: NgOption[]

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.page = 1
    this.pageSize = 10
    this.table_option =  [
      { value: 2 },
      { value: 5 },
      { value: 10 },
    ];
    this.date = new Date();
    this.date = this.date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    /* mock department info & time record */
    this.department = {
      id: 1,
      name: 'งานเชือดไก่',
      start_time: '05:00',
      end_time: '13:00',
      ot_plan: 2.5,
      actual_emp: 24,
      total_emp: 30
    }

    this.employees = [
      {
        name: 'สมชาย สายฟ้าฟาด',
        start: '04:30',
        end: null
      },
      {
        name: 'ภูวดล พาสกุล',
        start: '04:30',
        end: null
      },
      {
        name: 'มัลลิกา ธาดาวรวงศ์',
        start: '04:30',
        end: null
      },
      {
        name: 'โสธร ชนะสมบัติ',
        start: null,
        end: null
      }
    ]
  }

  getPercentage(actual_emp: number, total_emp: number) {
    return this.dashboardService.getPercentage(actual_emp, total_emp)
  }
}
