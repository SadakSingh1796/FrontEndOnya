import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/customer', title: 'Customer’s Tab', icon: 'person', class: '' },
  { path: '/onya', title: 'Onya’s Tab', icon: 'dashboard', class: '' },

  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  { path: '/business', title: 'Business', icon: 'library_books', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];
export const ROUTES1: RouteInfo[] = [
  // { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  // { path: '/customer', title: 'Customer’s Tab', icon: 'person', class: '' },
  { path: '/onya', title: 'Onya’s Tab', icon: 'dashboard', class: '' },

  // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
  // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
  // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
  // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
  { path: '/maps', title: 'Maps', icon: 'location_on', class: '' },
  // { path: '/notifications', title: 'Notifications', icon: 'notifications', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any = [];
  menuItems1: any = [];
  isBusiness: boolean = false;
  @Input() isBusinessV: boolean = false;
  constructor() {
  }

  ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    debugger
    localStorage.getItem('isBusiness') == 'true' ? this.isBusiness = true : this.isBusiness = false;
    this.menuItems = ROUTES1.filter(menuItem => menuItem);
    this.menuItems1 = ROUTES.filter(menuItem => menuItem);
    // this.menuItems = [];
    // this.menuItems1 = [];
    // if (localStorage.getItem('isBusiness')) {
    //   this.isBusiness = true;
    //   this.menuItems = ROUTES1.filter(menuItem => menuItem);
    // } else {
    //   this.isBusiness = false;
    //   this.menuItems1 = ROUTES.filter(menuItem => menuItem);
    // }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
