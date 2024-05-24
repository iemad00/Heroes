import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isCollapsed = true;

  menuItems: any[] = [
    { path: 'heroes', title: 'Hero List'},
    { path: 'my-profile', title: 'My Profile'},
  ];


  logout(){

  }
}
