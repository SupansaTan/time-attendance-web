import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPlanComponent } from './assign-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AssignPlanComponent
  },
  {
    path: ':depID',
    component: PlanDetailComponent
  },
  {
    path: '',
    redirectTo: 'assign-plan',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShiftRoutingModule { }