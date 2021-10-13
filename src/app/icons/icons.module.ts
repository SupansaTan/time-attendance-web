import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import { Menu, User, LogIn, LogOut } from 'angular-feather/icons';

const icons = {
  Menu,
  User,
  LogIn,
  LogOut
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
