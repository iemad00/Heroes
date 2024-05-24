import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-profile',
  templateUrl: './hero-profile.component.html',
  styleUrls: ['./hero-profile.component.scss']
})
export class HeroProfileComponent {

  hero = {
    id: 1,
    name: "Emad",
    powers: ['Angular', 'Nodejs', 'Python'],
    rate: 3.5
  }


}
