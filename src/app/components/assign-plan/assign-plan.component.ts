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
  manager_id: number;
  departments: Array<DepartmentModel> = new Array<DepartmentModel>();

  constructor(private shiftService: ShiftService, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.manager_id = this.authService.getUserid()

    this.shiftService.getManagerInfo(this.manager_id).subscribe((response) => {
      this.departments = response[0].department
    });
  }
}
