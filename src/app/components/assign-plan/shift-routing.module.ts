import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/service/auth-guard.service';
import { AssignPlanComponent } from './assign-plan.component';
import { PlanDetailComponent } from './plan-detail/plan-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AssignPlanComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: ':depID',
    component: PlanDetailComponent,
    canActivate: [AuthGuardService]
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
