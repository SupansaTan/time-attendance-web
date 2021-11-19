import { Component, OnInit } from '@angular/core';
import { DepartmentModel } from 'src/app/model/department.model';

import { ManagerService } from 'src/app/service/manager.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-assign-plan',
  templateUrl: './assign-plan.component.html',
  styleUrls: ['./assign-plan.component.scss']
})
export class AssignPlanComponent implements OnInit {
  manager_id: number;
  isNoDepartment: boolean = false;
  departments: Array<DepartmentModel> = new Array<DepartmentModel>();

  constructor(private managerService: ManagerService, private authService: AuthenticationService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show()
    this.manager_id = this.authService.getUserid()

    /* get all departments of manager */
    this.managerService.getManagerInfo(this.manager_id).subscribe(
      (data: any) => { this.departments = data[0]. department, this.spinner.hide() },
      (err: any) => { this.isNoDepartment = true, this.spinner.hide() },
    );
  }
}
