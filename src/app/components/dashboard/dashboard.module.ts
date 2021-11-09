import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";
import { DashboardManagerComponent } from './dashboard-manager/dashboard-manager.component';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardManagerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    DashboardRoutingModule,
    NgxSpinnerModule,
  ]
})
export class DashboardModule { }
