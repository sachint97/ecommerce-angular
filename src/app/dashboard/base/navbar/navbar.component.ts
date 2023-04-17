import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navItems! : MenuItem[];
  ngOnInit() {
    this.navItems = [
      {
          label: 'Login',
          icon: 'pi pi-fw pi-user',
          routerLink: ['/user/login']
       },
      {
        label: 'cart',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/cart']
      }
    ];

  }
}