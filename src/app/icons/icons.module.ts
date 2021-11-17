import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Menu, User, LogIn, LogOut, MoreVertical, Clock, Search } from 'angular-feather/icons';

const icons = {
  Menu,
  User,
  LogIn,
  LogOut,
  MoreVertical,
  Clock,
  Search
};

@NgModule({
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
