import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AssignPlanComponent } from './assign-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { ShiftRoutingModule } from './shift-routing.module';


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
  ]
})
export class ShiftModule { }
