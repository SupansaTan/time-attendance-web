export interface MenuItems {
  id: string;
  title: string;
  type: string;
  icon: string;
  url?: string;
  children?: Array<ChildrenItem>
}

export interface ChildrenItem {
  id: string;
  title: string;
  type?: string;
  url?: string;
  icon?: string;
}
