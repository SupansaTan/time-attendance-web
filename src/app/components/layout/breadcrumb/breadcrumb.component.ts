import { Component, OnInit } from '@angular/core';
import { ChildrenItem, MenuItems } from 'src/app/model/menu-items.model';
import { DepartmentService } from '../../../service/department.service'
import navigation from '../menu-items';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  current_path: Array<string>
  menu: MenuItems | any = new MenuItems()
  menuChild: ChildrenItem | any

  constructor(private departmentService: DepartmentService, private router: Router) {}

  ngOnInit(): void {
    this.current_path = location.pathname.split("/");

    if(this.current_path.includes('dashboard') || this.current_path.includes('assign-plan')) {
      this.menuName(this.current_path[1])
      this.current_path.length > 2 && this.current_path[1] != 'auth' ? this.addMenuChild() : false
    }
  }

  addMenuChild() {
    this.menuChild = new ChildrenItem()
    this.departmentService.getDepartmentInfo(Number(this.current_path[2])).subscribe(
      (data) => {
        this.menuChild.url = location.pathname
        this.menuChild.title = data[0].name
    })
  }

  menuName(path: string) {
    switch (path) {
      case 'dashboard':
        this.menu.title = 'Dashboard'
        this.menu.url = '/dashboard'
        this.menu.icon = 'bi bi-display'
        break

      case 'assign-plan':
        this.menu.title = 'Assign Plan'
        this.menu.url = '/assign-plan'
        this.menu.icon = 'bi bi-pen'
        break
    }
  }
}
