import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { AssignPlanComponent } from './assign-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { ShiftRoutingModule } from './shift-routing.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { IconsModule } from 'src/app/icons/icons.module';

@NgModule({
  declarations: [
    AssignPlanComponent,
    PlanDetailComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ShiftRoutingModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule.setLocale('th-TH'),
    IconsModule,
    NgxSpinnerModule
  ]
})
export class ShiftModule { }
