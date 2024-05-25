import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {

  @Input() hero?: any;
  @Input() admin?: any;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public userId: string,
    public heroService: HeroService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.userId) {
      this.getHero();
    }
  }

  getHero() {
    this.authService.getHero(this.userId).subscribe((res: any) => {
      if(res)
        this.hero = res;
      else
        this.getAdmin();
    });
  }

  getAdmin() {
    this.authService.getAdmin(this.userId).subscribe((res: any) => {
      if(res[0])
        this.admin = res[0];
    });
  }
}
