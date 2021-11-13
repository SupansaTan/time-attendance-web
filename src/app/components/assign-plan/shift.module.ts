import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AssignPlanComponent } from './assign-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';
import { ShiftRoutingModule } from './shift-routing.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

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
    NgSelectModule,
  ]
})
export class ShiftModule { }
