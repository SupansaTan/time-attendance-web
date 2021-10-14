import { Component, OnInit, HostListener } from '@angular/core';
import { MenuItems } from 'src/app/model/menu-items.model';
import navigation from '../menu-items';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {
  menus: Array<MenuItems>
  navCollapsed: boolean
  menuCollapsed: boolean
  public screenWidth: any;

  constructor() { }

  ngOnInit(): void {
    this.menus = navigation.items
    this.screenWidth = window.innerWidth;
    this.menuCollapsed = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }
}
