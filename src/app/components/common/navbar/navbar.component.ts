import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  menuItems: any[] = [
    { path: 'heroes', title: 'Hero List'},
  ];

  constructor(public authService: AuthService){}

  ngOnInit(): void {
    if(this.authService.isAuthenticated())
      this.menuItems.push({ path: 'my-profile', title: 'My Profile'})
    else{
      this.menuItems.push({ path: 'login', title: 'Login'})
      this.menuItems.push({ path: 'register', title: 'Create a new Account'})
    }
  }


  logout(){
    if(confirm('are you sure you want to logout?'))
      this.authService.signOut();
  }
}
