import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService){}


  logout(){
    this.authService.signOut();
  }
}
