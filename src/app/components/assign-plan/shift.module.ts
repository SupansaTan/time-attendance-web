import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AssignPlanComponent } from './assign-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { ShiftRoutingModule } from './shift-routing.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    NgxSpinnerModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ]
})
export class ShiftModule { }
