import { Component, OnInit } from '@angular/core';
import { IAdmin } from 'src/app/interfaces/admin';
import { IUser } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {
  hero: IUser|undefined;
  admin: IAdmin|undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    this.authService.currentHero.subscribe((res: any) => {
      if (res.length === 0)
        this.getAdmin();
      else
        this.hero = res[0];

    });
  }

  getAdmin() {
    this.authService.currentAdmin.subscribe((res: any) => {
      if (res.length > 0)
        this.admin = res[0];
    });
  }
}
