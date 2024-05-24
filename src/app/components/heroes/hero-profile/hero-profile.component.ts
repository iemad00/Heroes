import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent implements OnInit {


  hero = {}
  admin = {}

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.getHero()
  }

  getHero(){
    this.authService.currentHero.subscribe((res: any) => {
      this.hero = res[0];
      if(!this.hero)
        this.getAdmin()
    })
  }

  getAdmin(){
    this.authService.currentAdmin.subscribe((res: any) => {
      this.admin = res[0]
    })
  }

}
