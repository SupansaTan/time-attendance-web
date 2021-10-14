import { Component, OnInit } from '@angular/core';
import { ChildrenItem, MenuItems } from 'src/app/model/menu-items.model';
import navigation from '../menu-items';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  path: Array<string>
  menu: MenuItems | any
  menuChild: Array<ChildrenItem> | any

  constructor() { }

  ngOnInit(): void {
    this.path = location.pathname.split("/")
    this.menu = navigation.items.find((item) => item.url == '/' + this.path[1])

    if(this.path.length > 2) {
      this.menu.children.forEach((child: any) => {
        if(child.url == this.path[2]) {
          this.menuChild.push(child)
        }
      });
    }
  }

}
