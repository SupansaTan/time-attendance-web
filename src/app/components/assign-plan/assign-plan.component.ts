import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from 'src/app/model/department.model';
import { PlanShiftModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';
import { ShiftService } from './shift.service';

import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.scss']
})
export class AssignPlanComponent implements OnInit {
  employee_id: number;
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()
  departments: Array<DepartmentModel> = new Array<DepartmentModel>()

  constructor(private shiftService: ShiftService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.employee_id = this.authService.getUserid()

    this.shiftService.getManagerInfo(this.employee_id).subscribe((response) => {
      this.manager_info = response
      this.manager_info[0].department.forEach( (element:any) =>{
        let department_id = (element.id)
        this.shiftService.getDepartmentInfo(department_id).subscribe((response) => {
          this.departments.push(response[0])
        });
      });
    });
  }
}
