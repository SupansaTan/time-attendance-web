import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignPlanComponent } from './components/assign-plan/assign-plan.component';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'assign-plan',
    component: AssignPlanComponent,
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
