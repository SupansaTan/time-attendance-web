import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from 'src/app/model/department.model';
import { PlanShiftModel,ShiftCodeModel } from 'src/app/model/shift.model';
import { EmployeeModel } from 'src/app/model/employee.model';
import { TimeRecordModel } from 'src/app/model/timerecord.model';
import { ShiftService } from './shift.service';

import { AuthenticationService } from '../authentication/authentication.service';
import { DepartmentService } from '../../service/department.service';

@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.scss']
})
export class AssignPlanComponent implements OnInit {
  employee_id: number;
  planshifts: Array<PlanShiftModel> = new Array<PlanShiftModel>()
  manager_info: Array<EmployeeModel> = new Array<EmployeeModel>()

  constructor(private shiftService: ShiftService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.employee_id = this.authService.getUserid()

    this.shiftService.getManagerInfo(this.employee_id).subscribe((response) => {
      this.manager_info = response
      this.manager_info[0].department.forEach( (element:any) =>{
        let department_id = (element.id)
        this.shiftService.getDepPlanShift(department_id).subscribe((response) => {
          this.planshifts.push(response[0])
        });
      });
    });
  }
}
