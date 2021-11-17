import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardEmployeeComponent } from './dashboard-employee/dashboard-employee.component';
import { IconsModule } from '../../icons/icons.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardManagerComponent,
    DepartmentDetailComponent,
    DashboardEmployeeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    NgSelectModule,
    IconsModule,
  ]
})
export class DashboardModule { }
