import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-dashboard-employee',
  templateUrl: './dashboard-employee.component.html',
  styleUrls: ['./dashboard-employee.component.scss']
})
export class DashboardEmployeeComponent implements OnInit {
  plan: Array<any> = [];
  employee: any
  today: Date | string

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.today = new Date()
    this.today = this.today.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    this.employee = this.employeeService.getEmployee(4)
    this.plan = [
      {
        date: '02/09/2564',
        shift_start: '05.00',
        shift_end: '13.00',
        ot: 2.5,
        break_start: '10.00',
        break_end: '11.00'
      },
      {
        date: '03/09/2564',
        shift_start: '05.00',
        shift_end: '13.00',
        ot: 2.5,
        break_start: '10.00',
        break_end: '11.00'
      }
    ]
  }

  convertToThaiDate(d: string) {
    let date = parseInt(d.substring(0,2))
    let month = parseInt(d.substring(3,5))
    let year = parseInt(d.substring(6,10)) - 543

    let date_input = new Date(year, month-1, date)
    return date_input.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}
